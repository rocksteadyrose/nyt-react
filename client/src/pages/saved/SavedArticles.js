import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import nytapi from "../../utils/nyt/nytapi";

class SavedArticles extends Component {
  state = {
    article: {}
  };
  // When this component mounts, grab the article with the _id of this.props.match.params.id
  // e.g. localhost:3000/articles/599dcb67f0f16317844583fc
  componentDidMount() {
    nytapi.getArticle(this.props.match.params.id)
    .then(res => this.setState({ article: res.data }))
    .catch(err => console.log(err));
  }


 
  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
              {this.state.article.title} on{this.state.article.startYear}
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>About</h1>
              <p>
                {/* {this.state.articles.data} */}
              </p>
            </article>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Authors</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SavedArticles;
