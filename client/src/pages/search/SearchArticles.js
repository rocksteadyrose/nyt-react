import Moment from "react-moment";
import React, { Component } from "react";
import SaveButton from "../../components/SaveButton";
import Jumbotron from "../../components/Jumbotron";
import nytapi from "../../utils/nyt/nytapi";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class SearchArticles extends Component {
  //Putting default values in case nothing is entered for the year
  state = {
    search: "",
    startYear: "",
    endYear: "",
    articles: [],
    savedArticles: [],
    title: "",
  };

  searchArticle = (event) => {
    event.preventDefault();

    nytapi.getArticles(this.state.search, this.state.startYear, this.state.endYear)
      .then(res => {
        console.log(res.data.response.docs)
        this.setState({ articles: res.data.response.docs });
      })
      .then(res => {
        if (this.state.articles.length > 0) {
          alert("📰 Articles found! 📰")
        } else {
          alert("😢 No articles found! Try another search! 😢")
        }
      })
      .catch(err => console.log(err));
  }

  deleteArticleFunction = (event) => {
    event.preventDefault();
    //Find the article from the articles array with the ID matching the saved button
    const deleteArticleButton = this.state.savedArticles.filter(element => element._id = event.target.id)[0];
    nytapi.deleteSavedArticle(deleteArticleButton)
      .then(res => this.loadSavedArticles())
      .catch(err => console.log(err));
  };

  saveArticleFunction = event => {
    event.preventDefault();

    //Find the article from the articles array with the ID matching the saved button
    const articleSaveButtonContent = (this.state.articles.filter(element => element._id === event.target.id)[0]);
    nytapi.saveArticle({
      title: articleSaveButtonContent.headline.main, author: articleSaveButtonContent.source, summary: articleSaveButtonContent.snippet, articleDate: articleSaveButtonContent.pub_date, link: articleSaveButtonContent.web_url
    })
      .then(res =>
        alert("📰 Article saved! 📰"))
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
          articles: res.data.response.docs
        })
      )
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>New York Times Article Scrubber</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.search}
                onChange={this.handleInputChange}
                name="search"
                placeholder="Search Term"
              />
              <Input
                value={this.state.startYear}
                onChange={this.handleInputChange}
                name="startYear"
                placeholder="Start Date"
              />
              <Input
                value={this.state.endYear}
                onChange={this.handleInputChange}
                name="endYear"
                placeholder="End Date"
              />
              <FormBtn
                disabled={!(this.state.search && this.state.startYear && this.state.endYear)}
                onClick={this.searchArticle}
              >
                SUBMIT
              </FormBtn>
            </form>
          </Col>

          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>Results</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <strong>
                      <h2>{article.headline.main}</h2>
                    </strong>
                    <h5>Date published: <Moment date = {article.pub_date}/></h5>
                    <h6>{article.snippet}</h6>

                    <a href={article.web_url} target="blank"><span role="img" aria-label="newspaper1">📰</span> Read more here <span role="img" aria-label="newspaper2">📰</span></a>
                    <SaveButton id={article._id} onClick={this.saveArticleFunction} />
                  </ListItem>
                ))}
              </List>
            ) :
              (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>

      </Container>
    );
  }
}


export default SearchArticles;
