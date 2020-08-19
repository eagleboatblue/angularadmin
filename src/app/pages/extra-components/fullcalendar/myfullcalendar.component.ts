import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'fullcalendar',
  templateUrl: 'myfullcalendar.component.html',
  styleUrls: ['myfullcalendar.component.scss'],
})

export class MyFullcalendarComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    events: [{
      title: 'Vacation', date: '2020-08-21'
    },
    {
      title: 'Sick Day', date: '2020-08-22'

    }]
  };
  eventsModel: any;
  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;

  ngOnInit() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      editable: true,
      customButtons: {
        myCustomButton: {
          text: 'custom!',
          click: function () {
            alert('clicked the custom button!');
          }
        }
      },
      headerToolbar: {
        left: 'prev,next today myCustomButton',
        center: 'title',
        right: 'dayGridMonth'
      },
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDragStop: this.handleEventDragStop.bind(this)
    };
  }

  handleDateClick(arg) {
    console.log('myfullcalendar.component.ts>hendleDateClick()' + arg);
    alert('clicked a date cell!');
  }

  handleEventClick(arg) {
    console.log(arg);
  }

  handleEventDragStop(arg) {
    console.log(arg);
  }

  updateHeader() {
    this.calendarOptions.headerToolbar = {
      left: 'prev,next myCustomButton',
      center: 'title',
      right: ''
    };
  }

  updateEvents() {
    const nowDate = new Date();
    const yearMonth = nowDate.getUTCFullYear() + '-' + (nowDate.getUTCMonth() + 1);

    this.calendarOptions.events = [{
      title: 'Updaten Event',
      start: yearMonth + '-08',
      end: yearMonth + '-10'
    }];
  }

}
