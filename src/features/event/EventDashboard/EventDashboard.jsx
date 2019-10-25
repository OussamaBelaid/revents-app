import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react'
import EventList from '../EventList/EventList'
import EventForm from '../EventForm/EventForm'
import cuid from 'cuid'
// events initializations
const eventsFromDashboard = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Trip to Punch and Judy Pub',
    date: '2018-03-28',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      }
    ]
  }
]


class EventDashboard extends Component {
  //initialize state 
    state = {
        events : eventsFromDashboard,
        isOpened : false,
        selectedEvent:null
    };

    // handleIsOpenToggle = () => {
    //      this.setState(({isOpened}) => ({
    //          isOpened:!isOpened
    //      }))
    // }
// function that change the state of form interface from close to open
// the function will be passed from parent to child (eventDashboard => Event form)via the props and when submit button
// get trigered it will pass the event to the handleCreateEvent and it will bind the event list component
   handleCreateFormOpen = () => {
     this.setState({
       isOpened:true,
       selectedEvent:null
     })
   }
 // function that change the state of form interface from open to close
   handleFormCancel = () => {
     this.setState({
       isOpened : false
     })
   }
   //function that create in event when submit button clicked with closing the form interface
    handleCreateEvent = (newEvent) => {
        newEvent.id = cuid();
        newEvent.hostPhotoURL ='/assets/user.png';
        this.setState(({events}) =>({
            events:[...events,newEvent],
            isOpened : false
        }))
   }
 //fonction that handle the select of in event and showin it in form interface when view button clicked
   handleSelectEvent = (event) => {
     this.setState({
      selectedEvent:event,
      isOpened:true
     })

   }
   // function that handle the update of in event throw the form interface
   handleUpdateEvent =(updatedEvent) => {
     this.setState(({events}) => ({
       events : events.map(event => {
         if(event.id === updatedEvent.id)
         {
           return {...updatedEvent}
         }else {
           return event
         }
       }),
       isOpen:false,
       selectedEvent : null
     }))
   }
   // function that handle the deleting of in event
   handleDeleteEvent = (id) => {
     this.setState(({events}) => ({
       events:events.filter(e => e.id !== id)
     }))
   }
    render() {
        const {events,isOpened,selectedEvent} = this.state
        return (
           <Grid>
               <Grid.Column width={10}>
               <EventList events={events} selectEvent={this.handleSelectEvent} deleteEvent={this.handleDeleteEvent}/>
               </Grid.Column>
               <Grid.Column width={6}>
                <Button onClick={this.handleCreateFormOpen} positive content='create Event'/>
                {isOpened && <EventForm 
                key={selectedEvent ? selectedEvent.id : 0} 
                updatedEvent = {this.handleUpdateEvent}
                selectedEvent={selectedEvent} 
                createEvent={this.handleCreateEvent} 
                cancelFormOpen={this.handleFormCancel} />}
               
               </Grid.Column>
           </Grid>
        )
    }
}


export default EventDashboard;