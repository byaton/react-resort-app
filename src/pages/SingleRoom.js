import React, {Component, Fragment} from 'react';
import defaultBcg from '../images/room-1.jpeg';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import StyledHero from '../components/StyledHero';
import { Link } from 'react-router-dom';
import { RoomContext } from '../context';

export default class SingleRoom extends Component {
    state = {
        slug: '',
        defaultBcg
    }
    // constructor(props) {
    //     super(props);
    //     this.setState({slug: props.match.params.slug});
    // }


    componentDidMount() {
        this.setState({slug: this.props.match.params.slug, defaultBcg});
    }

    static contextType = RoomContext;

    render() {
        const { getRoom } = this.context;
        const room = !!getRoom ? getRoom(this.state.slug) : null;
        if (!room) {
            return <div className='error'>
                        <h3>No such room was found . . .</h3>
                        <Link to = '/rooms' className='btn-primary'>
                            Back to Rooms
                        </Link>
                    </div>
        }
        const { name, description, capacity, size, price, extras, breakfast, pets, images} = room;
        
        return (
            <>
                <StyledHero img={images[0] || this.state.defaultBcg}>
                    <Banner title={`${name} room`} >
                        <Link to='/rooms' className='btn-primary'>
                            back to rooms
                        </Link>
                    </Banner>
                </StyledHero>
                <section className='single-room'>
                    <div className='single-room-images'>
                        {images.map((item, index) => <img key = {index} src = {item} alt = {name}/>)}
                    </div>
                </section>
            </>
        );
    }
}