import React, { Component } from "react";
import DeleteButton from "../../components/DeleteButton";
import Jumbotron from "../../components/Jumbotron";
import nytapi from "../../utils/nyt/nytapi";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";


class SearchArticles extends Component {
  state = {
    title: "",
    startYear: "",
    endYear: "",
    articles: []
  };

  // componentDidMount() {
  //   this.loadArticles();
  // }

    // (this.state.searchTerm, this.state.startYear, this.state.endYear)
  loadArticles = () => {
    nytapi.getArticles()
    .then(res => {
        this.setState({ articles: res.data, title: "", startYear: "", endYear: "" });
        // console.log(res.data)
      })
      .catch(err => console.log(err));
  }

  searchArticle = (event) => {
    event.preventDefault();
    nytapi.getArticle(this.state.title, this.state.startYear, this.state.endYear)
    .then(res => {
      console.log(res)
        this.setState({ articles: res.data.response.docs});
        // console.log(res.data)
      })
      .catch(err => console.log(err));
  }

  deleteArticle = id => {
    nytapi.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  // saveArticle = (title, link, articleDate) => {
  //   nytapi.saveArticle({
  //     title: title,
  //     link: link,
  //     articleDate: articleDate
  //   })
  //     .then(res => console.log("Saved the article"))
  //     .catch(err => console.log(err));
  // };


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  handleFormSubmit = event => {
    event.preventDefault();
    nytapi.saveArticle({
      title: this.state.title,
        // link: this.state.link,
        startYear: this.state.startYear,
        endYear: this.state.endYear
    })
      .then(res =>
        this.loadArticles()
        )
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
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
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
                disabled={!(this.state.title && this.state.startYear && this.state.endYear)}
                onClick={this.searchArticle}
              >
                Submit
              </FormBtn>
            </form>
          </Col>

          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Saved Articles</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                  <Link to={"/articles/" + article._id}>
                  <strong>
                {article.title} on{article.startYear}
                </strong>
                </Link>
                    <DeleteButton onClick={() => this.deleteButton(article._id)} />
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
