import React, { Component } from "react";
import SaveButton from "../../components/SaveButton";
import DeleteButton from "../../components/DeleteButton";
import Jumbotron from "../../components/Jumbotron";
import nytapi from "../../utils/nyt/nytapi";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";


class SearchArticles extends Component {
  state = {
    search: "",
    startYear: "",
    endYear: "",
    articles: [],
    savedArticles: [],
    title: ""
  };

  componentDidMount() {
    this.loadSavedArticles();
  }

  loadSavedArticles = () => {
    nytapi.getSaved()
    .then(res => {
        this.setState({ savedArticles: res.data}
      );
      })  
      .catch(err => console.log(err));
  }

  searchArticle = (event) => {
    event.preventDefault();
    nytapi.getArticles(this.state.search, this.state.startYear, this.state.endYear)
    .then(res => {
      console.log(res)
        this.setState({ articles: res.data.response.docs});
        // console.log(res.data)
      })
      .catch(err => console.log(err));
  }

  // deleteArticle = id => {
  //   nytapi.deleteArticle(id)
  //     .then(res => this.loadArticles())
  //     .catch(err => console.log(err));
  // };

  saveArticleFunction = event => {
    event.preventDefault();

    //Find the article from the articles array with the ID matching the saved button
    const articleSaveButton = (this.state.articles.filter(element => element._id === event.target.id)[0]);
    nytapi.saveArticle({ title: articleSaveButton.headline.main})
      .then(res => 
        this.loadSavedArticles())
      .catch(err => console.log(err));
  };


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  handleFormSubmit = event => {
    event.preventDefault();
    nytapi.getArticles(this.state
    )
      .then(res =>
        this.setState({
          articles: res.data.response.docs})
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
                value={this.state.search}
                onChange={this.handleInputChange}
                name="search"
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
                disabled={!(this.state.search && this.state.startYear && this.state.endYear)}
                onClick={this.searchArticle}
              >
                Submit
              </FormBtn>
            </form>
          </Col>

          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Results</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                  <Link to={"/articles/" + article._id}>
                  <strong>
                {article.headline.main}
                </strong>
                </Link>
                    <SaveButton id={article._id} onClick={this.saveArticleFunction} />
                  </ListItem>
                ))}
                </List>
                ) : (
                <h3>No Results to Display</h3>
                )}
          </Col>
        </Row>

        <Row>
        <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Saved Articles</h1>
            </Jumbotron>
            {this.state.savedArticles.length ? (
              <List>
                {this.state.savedArticles.map(article => (
                  <ListItem key={article._id}>
                  <Link to={"/articles/" + article._id}>
                  <strong>
                {article.headline.main}
                </strong>
                </Link>
                    <DeleteButton id={article._id} onClick={this.deleteArticleFunction} />
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
