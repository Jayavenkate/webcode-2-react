import { useEffect } from "react";
import { useState } from "react";

export function MovieBooking() {
  let [screens, setScreen] = useState([]);

  const [movies, setMovie] = useState([]);

  const [selectedScreen, setSelectedScreen] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatSelect = (index, screen) => {
    if (screen?.id !== selectedScreen?.id) {
      setSelectedSeats([index]);
      setSelectedScreen(screen);
      return;
    }
    setSelectedScreen(screen);
    if (selectedSeats.includes(index)) {
      setSelectedSeats(selectedSeats.filter((i) => i !== index));
    } else {
      setSelectedSeats((seats) => [...seats, index]);
    }
  };
  useEffect(() => {
    fetch("https://webcode-2-node.vercel.app/showmovies")
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, []);

  useEffect(() => {
    fetch("https://webcode-2-node.vercel.app/screens")
      .then((res) => res.json())
      .then((data) => setScreen(data));
  }, []);
  const handleBooking = () => {
    alert(
      `Seats ${selectedSeats.map((index) => index + 1).join(", ")} booked for ${
        selectedScreen.movie.title
      } at ${selectedScreen.time}`
    );
    screens = screens.map((screen) => {
      if (screen.id === selectedScreen?.id) {
        let seats = screen.seats;
        selectedSeats.map((seat) => (seats[seat] = 0));
        return {
          ...screen,
          seats,
        };
      }
      return screen;
    });
    setSelectedMovie(null);
    setSelectedScreen(null);
    setSelectedSeats([]);
  };
  return (
    <div>
      <h1>Movie Booking App</h1>
      <h2>Choose your movie :</h2>
      <div className="movie-selection">
        {movies.map((movie, id) => (
          <div
            className="movie"
            key={id}
            onClick={() => setSelectedMovie(movie)}
          >
            <img className="movie-poster" src={movie.image} alt={movie.title} />
            <div className="movie-title">{movie.title}</div>
          </div>
        ))}
      </div>
      {selectedMovie && (
        <>
          <h2>choose your screen</h2>
          <div className="screen-selection">
            {screens.map((screen, _id) => (
              <div
                key={_id}
                className={`screen ${
                  screen?.id === selectedScreen?.id ? "selected" : ""
                } ${screen.seats.includes(1) ? "available" : ""}`}
              >
                <div className="screen-number">Screen{screen.id}</div>
                <div className="screen-time">{screen.time}</div>
                <div className="movie-title">{selectedMovie.title}</div>
                <div className="screen-seats">
                  {screen.seats.map((seat, index) => {
                    return (
                      <div
                        key={index}
                        className={`seat ${seat ? "available" : ""} ${
                          selectedSeats.includes(index) &&
                          selectedScreen?.id === screen.id
                            ? "selected"
                            : ""
                        }
                        ${selectedSeats.includes(index) ? "booked" : ""}`}
                        onClick={() => {
                          if (seat) {
                            handleSeatSelect(index, {
                              ...screen,
                              movie: selectedMovie,
                            });
                          }
                        }}
                      >
                        <div className="seat-number">{index + 1}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <div className="booking-summary">
        <div className="selected-screen">
          {selectedScreen && (
            <div>
              <h3>SelectedScreen :{selectedScreen.id}</h3>
              <p>Time: {selectedScreen.time}</p>
              <p>Movie :{selectedScreen.movie.title}</p>
            </div>
          )}
        </div>
        <div className="selected-seat">
          {selectedScreen && selectedSeats?.length > 0 && (
            <div>
              <h3>
                Selected Seats:
                <>{selectedSeats.map((index) => index + 1).join(", ")}</>
              </h3>
              <h3>No of tickets :{selectedSeats?.length}</h3>
            </div>
          )}
        </div>
      </div>
      <button
        className="payment-button"
        onClick={handleBooking}
        disabled={!selectedScreen || selectedSeats?.length === 0}
      >
        Book Now
      </button>
    </div>
  );
}
