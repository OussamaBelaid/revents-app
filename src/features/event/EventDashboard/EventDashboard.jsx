import React, { Component } from 'react'
import { Grid} from 'semantic-ui-react'
import {connect} from 'react-redux'
import EventList from '../EventList/EventList'
import {createEvent,deleteEvent,updateEvent} from '../eventActions'
const mapState =(state) => ({
  events : state.events
})

const actions = {
  createEvent,
  deleteEvent,
  updateEvent
}
class EventDashboard extends Component {


 // function that change the state of form interface from open to close
   handleFormCancel = () => {
     this.setState({
       isOpened : false
     })
   }
  
   // function that handle the deleting of in event
   handleDeleteEvent = id => {
     
    this.props.deleteEvent(id);
   };
    render() {
      
        const {events} = this.props;
        return (
           <Grid>
               <Grid.Column width={10}>
               <EventList events={events} deleteEvent={this.handleDeleteEvent}/>
               </Grid.Column>
               <Grid.Column width={6}> 
                 <h2>Activity Feed</h2>
               </Grid.Column>
           </Grid>
        )
    }
}


export default connect(mapState,actions)(EventDashboard);