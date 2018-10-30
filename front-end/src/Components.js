import React  from 'react';
import Modal from 'react-modal';
import {getEvents, getSeachEvent} from "./api";


Modal.setAppElement('#root')

export class EventRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        };
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render() {
        const event = this.props.event;

        return (

            <tr>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={{

                        content: {
                            width: '35%',
                            height:'50%',
                            margin: 'auto',

                        }
                    }}
                    contentLabel="Desc"
                >
                    <div className="container container-fluid">
                        <div className="h2">
                            <h2 style={{color:"blue"}}>Description</h2>
                        </div>

                        <br/>
                        <br/>
                        <h4>{event.description}</h4>
                    </div>

                </Modal>

                <td onClick={this.openModal}>{event.title}</td>
                <td>{event.category}</td>
                <td>{event.start_date}</td>
                <td>{event.end_date}</td>
                <td>{event.web_source}</td>
                <td><a href={event.link}>Visit Event</a></td>


            </tr>
        );
    }
}

export class EventTable extends React.Component {
    state = {
        query: '',
        _events: this.props._events.data,
        pages:(Math.ceil(this.props._events.meta.records/10)),
    };

    handleInputChange = () => {

        if (this.search.value.length >=3){

            getSeachEvent(this.search.value).then(res => this.setState({_events:res.data.data, pages:(Math.ceil(res.data.meta.records/10))}))
                .catch(err => alert("An error occurred"));
        }else{
            this.setState({_events:this.props._events.data, pages:(Math.ceil(this.props._events.meta.records/10))})
        }


    };
    handlePagination = (page) =>{
        getEvents(page).then(res => this.setState({_events:res.data.data}))
            .catch(err => alert("An error occurred"));
    };
    render() {
        const rows = [];
        this.state._events.forEach((event) => {
            rows.push(<EventRow event={event} key={`event-${event.id}`}/>
            );
        });
        var pages = [];
        for (var i = 1; i <= this.state.pages; i++) {
            pages.push(i);
        }
        const listItems = pages.map((page) =>  <li onClick={this.handlePagination.bind(this,page)} key={`page-${page}`} className="page-item"><a className="page-link" href="#">{page}</a></li>);

        return (
            <div style={{padding:"30px", backgroundColor:"#ffffff"}}>
                <div className="row" style={{justifyContent:"center"}}>
                    <h1 style={{textAlign:"center"}}>Daila Calendar</h1>
                </div>
                <div className="fa-search row" style={{justifyContent:"center"}}>
                    <form>
                        <input
                            placeholder="Search for..."
                            style={{textAlign:"center",width:"400px"}}
                            ref={input => this.search = input}
                            onChange={this.handleInputChange}
                        />

                    </form>
                </div>
                <br/>

                <table className="table table-striped table-bordered table-hover">
                    <thead>
                    <tr>
                        <th scope="row">Title</th>
                        <th scope="row">Category</th>
                        <th scope="row">Start Date</th>
                        <th scope="row">End Date</th>
                        <th scope="row">Web Source</th>
                        <th scope="row">Link</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
                <div className="row" style={{justifyContent:"center"}}>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            {listItems}
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}

