
// import './App.css';
import React from 'react';
import {useState, useEffect} from 'react';
import ArticleList from './components/ArticleList';
import Form from './components/Form';

function App() {

  const [articles, setArticles]= useState([])
  const [edittedArticle, setEdittedArticle]= useState(null)


  useEffect(() => {
    fetch('http://127.0.0.1:5000/get', {
      'method': 'GET',
      headers: {
        'Content-Type': ' application/json'
      }
    })
    .then(resp => resp.json())
    .then(resp => setArticles(resp))
    .catch(error => console.log(error))
  },[])

  const editArticle = (article)=> {
    setEdittedArticle(article)
  }

  const updatedData = (article)=> {
    const new_article = articles.map(my_article => {
      if(my_article.id === article.id) {
        return article
      } else {
        return my_article
      }
    })
    setArticles(new_article)
  }

  const openForm = ()=> {
    setEdittedArticle({title:'', body: ''})
  }

  const insertedArticle = (article)=> {
    const new_articles = [...articles, article]
    setArticles(new_articles)
  }

  const deleteArticle = (article) => {
    const new_articles = articles.filter(myarticle => {
      if(myarticle.id === article.id) {
        return false;
      }
      return true
    })
    setArticles(new_articles)
  }

  return (
    <div className="App">
      <div className='row'>
        <div className='col'>
        <h1>Flask and ReactJS Project</h1>

        </div>
        <div className='col'>
        <button className='btn btn-success'
        onClick={openForm}
        >Insert Article</button>
        </div>
      </div>

      <br/>
      <br/>

      {edittedArticle ? <Form article = {edittedArticle} updatedData = {updatedData} insertedArticle = {insertedArticle}/> : null }
      <hr/>

        <ArticleList articlesLi={articles} editArticle={editArticle} deleteArticle={deleteArticle}/>

    </div>
  );
}

export default App;
