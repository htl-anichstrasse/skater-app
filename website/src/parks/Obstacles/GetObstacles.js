import useFetch from '../../hooks/UseFetch'
import './GetObstacles.css'

const GetObstacles = (id) => {

    const {
        data: obstacle,
        isPending,
        error,
      } = useFetch('https://skate-buddy.josholaus.com/api/Obstacles/' + id.id);
  
    return (

      <div className="obstacle">
            {isPending && 
                <div className='loading'>
                    <h1>
                        LOADING...
                    </h1>
                </div>}
            {error &&
                <div className='error'>
                    <h1>Etwas ist schiefgelaufen</h1>
                </div>}
            {obstacle &&
            <div className='single-obstacle'>
                <div className="dropdown-obstacles">
                    <span className='obstacle-pic'><img src="https://www.skatedeluxe.com/blog/wp-content/uploads/2015/06/obstacle-bank.jpg" alt="pic" className='obstacle-pic'></img></span>
                        <div className="dropdown-content-obstacles">
                            <p className="description">{obstacle.description}</p>
                            <p className='Oname'>Schwierigkeit: {obstacle.difficulty}</p>
                        </div>
                </div>
            </div>
            }
      </div>
    );
  };


export default GetObstacles;