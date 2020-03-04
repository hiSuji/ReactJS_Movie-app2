import React from "react";
import superagent from "superagent";

export default class extends React.Component {
  state = {
    movieDetail: null
  };
  componentDidMount = async () => {
    
    //URL에서 id가져오기
    const { match } = this.props;
    let movieId = match.params.id;

    // 데이터를 불러올 API 주소
    let url = `http://54.180.149.147:8080/api/team/5/movie/${movieId}`;

    //데이터를 서버에서 불러와서 movieDetail이라는 변수에 저장한다
    let movieDetail = await superagent
      .get(url)
      .then(response => response.body)
      .catch(error => error);

    //불러온 데이터를 브라우저에 임시로 저장한다
    this.setState({
      movieDetail
    });

    console.log(movieDetail);
  };

  render() {
    const { movieDetail } = this.state;

    //movie 데이터가 없는 경우
    if (!movieDetail) {
      return <div>준비중</div>;
    } else {

      //데이터가 들어온 경우 보여줄 화면 
      return (
        <div>
          <h3>영화 상세 페이지</h3>
          <div>상세한 영화에 대한 정보가 노출될 페이지입니다</div>

          <div>{movieDetail.title}</div>
          <img width="150" src={movieDetail.posterUrl}/>
          <div>{movieDetail.advanceRate}</div>
          <div>{movieDetail.visitorRating}</div>
          <div>{movieDetail.expertRating}</div>
          <div>{movieDetail.plot}</div>
          <div>{movieDetail.runtime}</div>
          <div>{movieDetail.released}</div>
          <div>{movieDetail.director}</div>
        </div>
      );
    }
  }
}