import React from "react";
import superagent from "superagent";
import '../style.css';
export default class extends React.Component {
  state = {
    movieList: []
  };

  // MovieList.js 파일
  componentDidMount = async () => {
    // 데이터를 불러올 API 주소
    let url = "http://54.180.149.147:8080/api/team/5/movie";

    //데이터를 서버에서 불러와서 movieList라는 변수에 저장한다
    let movieList = await superagent
      .get(url)
      .then(response => response.body)
      .catch(error => error);

    //불러온 데이터를 브라우저에 임시로 저장한다
    this.setState({
      movieList
    });

    console.log(movieList);
  };

  render() {
    const { movieList } = this.state;
    return (
      
      <div class="container">
        <h3 class="movieListTitle">#박스오피스</h3> 
        {movieList
          ? movieList.map(movie => (
              <MovieItem
              id={movie._id}
              plot={movie.plot}
              title={movie.title}
              posterUrl={movie.posterUrl}
              advanceRate={movie.advanceRate}
              advanceRateRank={movie.advanceRateRank}
            />
            ))
          : null}
      </div>
    );
  }
}

const MovieItem = ({ id, plot, title, posterUrl, advanceRate, advanceRateRank }) => {

  function view_plot(e) {
    e.target.parentNode.children[1].style.display = 'block';
  }

  function hidden_plot(e) {
    e.target.parentNode.children[1].style.display = 'none';
  }

  return (
	<div className="movie_item">
    <a href={`http://localhost:3000/movie/detail/${id}`}>
      <img onMouseEnter={view_plot} onMouseLeave={hidden_plot} className="movie_poster" src={posterUrl} />
      <span className="movie_plot">{plot}</span>
      <h3 className="movie_title">{title}</h3>
      <div className="movie_rate">예매율: {advanceRate}</div>
      <div className="movie_rank">예매율 순위 : {advanceRateRank}</div>
    </a>
	</div> 
 );
};