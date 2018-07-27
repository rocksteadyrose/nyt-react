import React, { Component } from "react";
import SaveButton from "../../components/SaveButton";
import DeleteButton from "../../components/DeleteButton";
import Jumbotron from "../../components/Jumbotron";
import nytapi from "../../utils/nyt/nytapi";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
// import Note from "../Note";


class SearchArticles extends Component {
  state = {
    search: "",
    startYear: "",
    endYear: "",
    articles: [],
    savedArticles: [],
    title: "",
    savedNotes: [],
    note: ""
  };

  

  searchArticle = (event) => {
    event.preventDefault();
    nytapi.getArticles(this.state.search, this.state.startYear, this.state.endYear)
      .then(res => {
        console.log(res)
        this.setState({ articles: res.data.response.docs });
        // console.log(res.data)
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
    nytapi.saveArticle({ title: articleSaveButtonContent.headline.main, author: articleSaveButtonContent.source, summary: articleSaveButtonContent.snippet, articleDate: articleSaveButtonContent.pub_date, link: articleSaveButtonContent.web_url, note: "none" })
      .then(res =>
        this.loadSavedArticles())
      .catch(err => console.log(err));
  };

  // addNoteFunction = event => {
  //   event.preventDefault();

  //         console.log(this.state.note
  //         )

  //   nytapi.saveNote({note: this.state.note
  //   })
  //     .then(res => 
  //      this.loadSavedNotes()
  //     )
  //     .catch(err => console.log(err));
  // };

  // loadSavedNotes = (event) => {
  //   event.preventDefault();
  //   nytapi.getSavedNotes()
  //   .then(res => {
  //     this.setState({ savedNotes: res.data })
  //     console.log(res.data)
  //   })
  //   .catch(err => console.log(err));
  // }


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
                placeholder="Search Term (required)"
              />
              <Input
                value={this.state.startYear}
                onChange={this.handleInputChange}
                name="startYear"
                placeholder="Start Date (optional)"
              />
              <Input
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

          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>Results</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                      <strong>
                        {article.headline.main} by {article.source}
                        </strong> <a href={article.web_url} target="blank"> Link</a>
                    <SaveButton id={article._id} onClick={this.saveArticleFunction} />
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
