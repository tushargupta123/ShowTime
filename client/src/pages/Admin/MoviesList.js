import React, { useEffect } from "react";
import Button from "../../components/Button.js";
import MovieForm from "./MovieForm";
import moment from "moment";
import { message, Table } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";
import { DeleteMovie, GetAllMovies } from "../../apicalls/movies";
import { DeleteFilled, EditFilled } from "@ant-design/icons"

function MoviesList() {
  const [movies, setMovies] = React.useState([]);
  const [showMovieFormModal, setShowMovieFormModal] = React.useState(false);
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [formType, setFormType] = React.useState("add");
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllMovies();
      console.log(response)
      if (response.success) {
        setMovies(response.data);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handleDelete = async (movieId) => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteMovie(movieId);
      if (response.success) {
        message.success(response.message);
        getData();
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Poster",
      dataIndex: "poster",
      render: (posterLink) => {
        return (
          <img
            src={posterLink}
            alt="poster"
            height="60"
            width="80"
            className="br-1"
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "title",
    },

    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (text, record) => {
        return moment(record.releaseDate).format("DD-MM-YYYY");
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-1">
            <DeleteFilled onClick={() => {
              handleDelete(record._id);
            }} style={{ fontSize: '20px'}}/>
            <EditFilled onClick={() => {
              setSelectedMovie(record);
              setFormType("edit");
              setShowMovieFormModal(true);
            }} style={{ fontSize: '20px'}}/>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-1">
        <Button
          title="Add Movie"
          variant="outlined"
          onClick={() => {
            setShowMovieFormModal(true);
            setFormType("add");
          }}
        />
      </div>

      <Table columns={columns} dataSource={movies} />

      {showMovieFormModal && (
        <MovieForm
          onClose={() => setShowMovieFormModal(false)}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          formType={formType}
          getData={getData}
        />
      )}
    </div>
  );
}

export default MoviesList;