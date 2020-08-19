import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'ngx-fullcalendar',
  templateUrl: 'myfullcalendar.component.html',
  styleUrls: ['myfullcalendar.component.scss'],
})

export class MyFullcalendarComponent implements OnInit {

  calendarOptions: CalendarOptions;

  eventsModel: any;
  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;

  ngOnInit() {
    const nowDate = new Date();
    const yearMonth = nowDate.getUTCFullYear() + '-0' + (nowDate.getUTCMonth() + 1);
    const myday = '2020-08-20';
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
          start: '2020-08-08',
          end: '2020-08-13',
        },
        {
          title: 'Vacation', start: myday, end: '2020-08-22',
        },
        {
          title: 'Sick Day', date: '2020-08-22',
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
    const nowDate = new Date();
    const yearMonth = nowDate.getUTCFullYear() + '-0' + (nowDate.getUTCMonth() + 1);
    const startDate = yearMonth + '-23';
    alert(startDate);
    this.calendarOptions.events = [{
      title: 'Production Final',
      start: startDate,
      end: '2020-08-26',
    }];
  }

}
