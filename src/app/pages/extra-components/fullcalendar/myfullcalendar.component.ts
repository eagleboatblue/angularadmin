import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-fullcalendar',
  templateUrl: 'myfullcalendar.component.html',
  styleUrls: ['myfullcalendar.component.scss'],
})

export class MyFullcalendarComponent implements OnInit {
  constructor(private http: HttpClient) {

  }
  calendarOptions: CalendarOptions;
  loadedEvents = [];

  eventsModel: any;
  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;

  ngOnInit() {
    const nowDate = new Date();
    const yearMonth = nowDate.getUTCFullYear() + '-0' + (nowDate.getUTCMonth() + 1);
    const myday = yearMonth + '-20';
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      editable: true,
      weekends: true,
      customButtons: {
        myCustomButton: {
          text: 'custom!',
          click: function () {
            alert('clicked the custom button!');
          },
        },
      },
      events: [
        {
          title: 'Updaten Event',
          start: yearMonth + '-08',
          end: yearMonth + '-13',
        },
        {
          title: 'Vacation', start: myday, end: yearMonth + '-22',
        },
        {
          title: 'Sick Day', date: yearMonth + '-22',
        },
      ],
      headerToolbar: {
        left: 'prev,next today myCustomButton',
        center: 'title',
        right: 'dayGridMonth dayGridWeek',
      },
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDragStop: this.handleEventDragStop.bind(this),
    };
  }

  private fetchEvents() {
    this.http.get('http://localhost:5000/events')
      .subscribe(events => {
        events = events['events'];
        const newevents = [];
        for (const key in events) {
          if (events.hasOwnProperty(key)) {
            newevents.push(events[key]);
          }
        }
        this.calendarOptions.events = newevents;
      });
  }

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends; // toggle the boolean!
  }

  handleDateClick(arg) {
    //    console.log('myfullcalendar.component.ts>hendleDateClick()' + arg);
    alert('clicked a date cell!' + arg.dateStr);
  }

  handleEventClick(arg) {
    //    console.log(arg);
  }

  handleEventDragStop(arg) {
    //    console.log(arg);
  }

  updateHeader() {
    this.calendarOptions.headerToolbar = {
      left: 'prev,next myCustomButton',
      center: 'title',
      right: '',
    };
  }

  updateEvents() {
    this.fetchEvents();
  }

}
