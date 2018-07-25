import React, { Component } from "react";
import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import nytapi from "../../utils/nyt/nytapi";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class SearchArticles extends Component {
  state = {
    searchTerm: "",
    startYear: "",
    endYear: "",
    results: []
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    nytapi.getArticles()
      .then(res =>
        this.setState({ articles: res.data, title: "", author: "", summary: "", date: "", startYear: "", endYear: "", articleDate: "", saved: "" })
      )
      .catch(err => console.log(err));
  };

  findArticles = (event) => {
    event.preventDefault();
    nytapi.findArticles(this.state.searchTerm, this.state.startYear, this.state.endYear)
  .then(res => {
    this.setState({articles: res.data.response.docs});
  })
  .catch(err => console.log(err));
  }

  deleteArticle = id => {
    nytapi.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  saveArticle = (title, link, articleDate) => {
    nytapi.saveArticle({
      title: title,
      link: link,
      articleDate: articleDate
    })
  };


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  handleFormSubmit = event => {
    event.preventDefault();
    nytapi.getArticles(this.state.searchTerm)
    .then(res => 
      this.setState({
        results: res.data
    }))
        .catch(err => console.log(err));
    }


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>New York Times Article Scrubber</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.searchTerm}
                onChange={this.handleInputChange}
                name="searchTerm"
                placeholder="Search Term (required)"
              />
              <Input
                value={this.state.startYear}
                onChange={this.handleInputChange}
                name="startYear"
                placeholder="Start Date (optional)"
              />
              <TextArea
                value={this.state.endYear}
                onChange={this.handleInputChange}
                name="endYear"
                placeholder="End Date (optional)"
              />
              <FormBtn
                disabled={!(this.state.searchTerm && this.state.startYear && this.state.endYear)}
                onClick={this.findArticles}
              >
                Submit
              </FormBtn>
            </form>
          </Col>

          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Saved Articles</h1>
            </Jumbotron>
            {this.state.results.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <Link to={"/articles/" + article._id}>
                      <strong>
                        {article.title} by {article.author}
                      </strong>
                    </Link>
                    <SaveBtn onClick={() => this.saveArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SearchArticles;
