import { useState } from "react";

export function MovieBooking() {
  let screens = [
    {
      id: 1,
      time: "10.00am",
      seats: [1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    },
    {
      id: 2,
      time: "2.00am",
      seats: [1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    },
    {
      id: 3,
      time: "6.00am",
      seats: [1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    },
  ];
  const [movies, setMovie] = useState([
    {
      id: 1,
      title: "Vikram",
      image:
        "https://m.media-amazon.com/images/M/MV5BMmJhYTYxMGEtNjQ5NS00MWZiLWEwN2ItYjJmMWE2YTU1YWYxXkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_.jpg",
    },
    {
      id: 2,
      title: "Jai Bhim",
      image:
        "https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
    },
    {
      id: 3,
      title: "Iron man 2",
      image:
        "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
    },
  ]);
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
  const handleBooking = () => {
    alert(
      `Seats ${selectedSeats.map((index) => index + 1).join(", ")} booked for ${
        selectedScreen.movie.title
      } at ${selectedScreen.time}`
    );
    screens = screens.map(screen => {
      if (screen.id === selectedScreen?.id) {
        let seats = screen.seats;
        selectedSeats.map((seat) => (seats[seat] = 0))
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
        {movies.map((movie) => (
          <div
            className="movie"
            key={movie.id}
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
            {screens.map((screen) => (
              <div
                key={screen.id}
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
        disabled={!selectedScreen || selectedSeats?.length ===0}
      >
        Book Now
      </button>
    </div>
  );
}
