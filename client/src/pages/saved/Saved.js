import React, { Component } from "react";
import Moment from "react-moment";
import DeleteButton from "../../components/DeleteButton";
import Jumbotron from "../../components/Jumbotron";
import nytapi from "../../utils/nyt/nytapi";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";

class Saved extends Component {
  state = {
    search: "",
    title: "",
    startYear: "",
    endYear: "",
    articles: [],
    savedArticles: [],
  };

  componentDidMount() {
    this.loadSavedArticles();
  }

  loadSavedArticles = () => {
    nytapi.getSaved()
      .then(res => {
        this.setState({ savedArticles: res.data })
        console.log(res.data)
      })
      .catch(err => console.log(err));
  }

  searchArticle = (event) => {
    event.preventDefault();
    nytapi.getArticles(this.state.search, this.state.startYear, this.state.endYear)
      .then(res => {
        console.log(res)
        this.setState({ articles: res.data.response.docs });
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
    nytapi.saveArticle({ title: articleSaveButtonContent.headline.main, author: articleSaveButtonContent.source, summary: articleSaveButtonContent.snippet, articleDate: articleSaveButtonContent.pub_date, link: articleSaveButtonContent.web_url})
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
          articles: res.data.response.docs
        })
      )
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>          
        <Row>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>Saved Articles</h1>
            </Jumbotron>
            {this.state.savedArticles.length ? (
              <List>
                {this.state.savedArticles.map(article => (
                  <ListItem key={article._id}>
                     <strong>
                        <h2>{article.title}</h2>
                        </strong>
                        <h5>Date published: <Moment date = {article.articleDate}/></h5>
                        <h5>Date saved: <Moment date = {article.date}/></h5>
                        <h6>{article.summary}</h6>

                         <a href={article.link} target="blank"> <span role="img" aria-label="newspaper1">📰</span> Read More Here <span role="img" aria-label="newspaper2">📰</span></a>
                    
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

export default Saved;
