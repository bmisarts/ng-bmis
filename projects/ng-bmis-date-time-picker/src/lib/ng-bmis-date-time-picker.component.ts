import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnInit, Output, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
  selector: "ng-bmis-date-time-picker",
  templateUrl: "./ng-bmis-date-time-picker.component.html",
  styleUrls: ["./ng-bmis-date-time-picker.component.scss"],
  standalone: false,
  encapsulation: ViewEncapsulation.None,
})
export class NgBmisDateTimePickerComponent implements OnInit, AfterViewInit {
  @Output() dateTimeChange = new EventEmitter<string>();

  currentDate!: Date;
  selectedDate!: Date;
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  isDropdownAbove = false;
  dateTimeInput!: any;
  dateTimePicker!: any;
  calendarIcon!: any;
  daysContainer!: any;
  timeInput!: any;
  monthSelect!: any;
  yearSelect!: any;
  calendarDays!: any;
  dateTimePickerId!: string;
  calendarDaysId!: string;
  calendarIconId!: string;
  daysContainerId!: string;
  timeInputId!: string;
  monthSelectId!: string;
  yearSelectId!: string;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    this.dateTimePickerId = `datetime-picker-${Math.random().toString(36).substr(2, 9)}`;
    this.calendarDaysId = `calendar-${Math.random().toString(36).substr(2, 9)}`;
    this.calendarIconId = `calendar-icon-${Math.random().toString(36).substr(2, 9)}`;
    this.daysContainerId = `days-${Math.random().toString(36).substr(2, 9)}`;
    this.timeInputId = `time-input-${Math.random().toString(36).substr(2, 9)}`;
    this.monthSelectId = `month-select-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    this.yearSelectId = `year-select-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  }

  ngAfterViewInit() {
    this.initializePicker();
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.adjustDropdownPosition();
  }

  @HostListener("window:scroll", ["$event"])
  onScroll() {
    this.adjustDropdownPosition();
  }

  initializePicker() {
    const uniqueDpInputId = `datetime-picker-input-${Math.random().toString(36).substr(2, 9)}`;
    this.dateTimeInput = this.el.nativeElement.querySelector("input");
    this.renderer.setAttribute(this.dateTimeInput, "id", uniqueDpInputId);
    this.dateTimeInput.classList.add('pointer-events-none');

    const uniqueTpInputId = `time-picker-input-${Math.random().toString(36).substr(2, 9)}`;
    this.timeInput = this.el.nativeElement.querySelector("input[type='time']");
    this.renderer.setAttribute(this.timeInput, "id", uniqueTpInputId);

    // Vérifier si l'input a une valeur existante de datetime
    const inputValue = this.dateTimeInput?.value;
    if (inputValue) {
      const parsedDate = new Date(inputValue);
      if (!isNaN(parsedDate.getTime())) {
        this.selectedDate = parsedDate; // Utiliser la valeur existante
        this.currentDate = parsedDate;
      }
    } else {
      const date = new Date();
      this.selectedDate = date; // Utiliser new Date() si aucune valeur n'est présente
      this.currentDate = date;
    }

    this.dateTimePicker = document.getElementById(
      this.dateTimePickerId
    ) as HTMLSelectElement;
    this.calendarIcon = document.getElementById(
      this.calendarIconId
    ) as HTMLElement;
    this.daysContainer = document.getElementById(
      this.daysContainerId
    ) as HTMLElement;
    this.timeInput = this.timeInput as HTMLInputElement;
    this.monthSelect = document.getElementById(
      this.monthSelectId
    ) as HTMLSelectElement;
    this.yearSelect = document.getElementById(
      this.yearSelectId
    ) as HTMLSelectElement;
    this.calendarDays = document.getElementById(
      this.calendarDaysId
    ) as HTMLSelectElement;

    const currentYear = new Date().getFullYear();

    this.months.forEach((month, index) => {
      const option = document.createElement("option");
      option.value = index.toString();
      option.textContent = month;
      this.monthSelect.appendChild(option);
    });

    for (let year = currentYear - 50; year <= currentYear + 50; year++) {
      const option = document.createElement("option");
      option.value = year.toString();
      option.textContent = year.toString();
      this.yearSelect.appendChild(option);
    }

    const updateCalendar = () => {
      const year = parseInt(this.yearSelect.value);
      const month = parseInt(this.monthSelect.value);

      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);

      const prevLastDay = new Date(year, month, 0);

      this.daysContainer.innerHTML = "";

      for (let i = 0; i < firstDay.getDay(); i++) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day", "disabled");
        const prevDate = prevLastDay.getDate() - firstDay.getDay() + 1 + i;
        dayElement.textContent = prevDate.toString();
        dayElement.addEventListener("click", () => {
          this.monthSelect.value = (month - 1).toString();
          if (month === 0) {
            this.yearSelect.value = (year - 1).toString();
            this.monthSelect.value = "11";
          }
          this.selectedDate = new Date(this.yearSelect.value, this.monthSelect.value, prevDate);
          dayElement.classList.add("active");
          updateDisplay();
          updateCalendar();
        });
        this.daysContainer.appendChild(dayElement);
      }

      for (let i = 1; i <= lastDay.getDate(); i++) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.textContent = i.toString();

        if (
          i === this.selectedDate.getDate() &&
          month === this.selectedDate.getMonth() &&
          year === this.selectedDate.getFullYear()
        ) {
          dayElement.classList.add("active");
        }

        dayElement.addEventListener("click", () => {
          this.selectedDate = new Date(year, month, i);
          dayElement.classList.add("active");
          updateDisplay();
        });

        this.daysContainer.appendChild(dayElement);
      }

      const remainingDays = 42 - this.daysContainer.children.length; // Ensure 42 days to cover 6 weeks

      for (let i = 1; i <= remainingDays; i++) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day", "disabled");
        dayElement.textContent = i.toString();
        dayElement.addEventListener("click", () => {
          this.monthSelect.value = (month + 1).toString();
          if (month === 11) {
            this.yearSelect.value = (year + 1).toString();
            this.monthSelect.value = "0";
          }
          this.selectedDate = new Date(this.yearSelect.value, this.monthSelect.value, i);
          updateDisplay();
          updateCalendar();
        });
        this.daysContainer.appendChild(dayElement);
      }
    };

    const formatDateTime = (date: Date, time: string): string => {
      // Convertir la chaîne localDateString en objet Date
      const reconvertedSelectedDate = new Date(date);
      const yyyy = reconvertedSelectedDate.getFullYear();
      const MM = (reconvertedSelectedDate.getMonth() + 1).toString().padStart(2, "0");
      const dd = reconvertedSelectedDate.getDate().toString().padStart(2, "0");

      //Set time
      const [hours, minutes] = time.split(":").map(Number);
      const hh = hours ?? reconvertedSelectedDate.getHours().toString().padStart(2, "0");
      const i = minutes ?? reconvertedSelectedDate.getMinutes().toString().padStart(2, "0");
      return `${yyyy}-${MM}-${dd} ${time || `${hh}:${i}`}`;
    };

    const updateDisplay = () => {
      updateCalendar();
      // Convertir la chaîne localDateString en objet Date
      const reconvertedSelectedDate = new Date(this.selectedDate);
      //Set time
      const [hours, minutes] = this.timeInput.value ? this.timeInput.value?.split(":").map(String) : [null, null]; 
      const hh = (hours ?? reconvertedSelectedDate.getHours()).toString().padStart(2, "0");
      const i = (minutes ?? reconvertedSelectedDate.getMinutes()).toString().padStart(2, "0");
      this.timeInput.value = `${hh}:${i}` ;
      const formattedDateTime = formatDateTime(this.selectedDate, this.timeInput.value);
      this.dateTimeInput.value = formattedDateTime;
      this.dateTimeChange.emit(formattedDateTime);
    };

    const toggleDateTimePicker = () => {
      this.dateTimePicker.style.display =
        this.dateTimePicker.style.display === "block" ? "none" : "block";
      this.adjustDropdownPosition();
    };
    this.calendarIcon.addEventListener("click", toggleDateTimePicker);

    this.timeInput.addEventListener("change", updateDisplay);

    this.monthSelect.addEventListener("change", updateCalendar);
    this.yearSelect.addEventListener("change", updateCalendar);

    document.addEventListener("click", (event) => {
      const targetElement = event.target as HTMLElement;
      if (
        !this.dateTimePicker.contains(targetElement) &&
        !this.daysContainer.contains(targetElement) &&
        (event.target !== this.calendarIcon)
      ) {
        this.dateTimePicker.style.display = "none";
      }
    });
    
    // Convertir la chaîne localDateString en objet Date
    const reconvertedSelectedDate = new Date(this.currentDate);
    this.monthSelect.value = reconvertedSelectedDate.getMonth().toString();
    this.yearSelect.value = currentYear.toString();

    updateDisplay();
  }

  adjustDropdownPosition() {
    const inputRect = this.dateTimeInput.getBoundingClientRect();
    const pickerRect = this.dateTimePicker.getBoundingClientRect();

    const spaceBelow = window.innerHeight - inputRect.bottom;
    const spaceAbove = inputRect.top;

    if (spaceBelow < pickerRect.height && spaceAbove > pickerRect.height) {
      this.isDropdownAbove = true;
      this.dateTimePicker.style.top = "auto";
      this.dateTimePicker.style.bottom = "calc(100% + 5px)";
    } else {
      this.isDropdownAbove = false;
      this.dateTimePicker.style.top = "calc(100% + 5px)";
      this.dateTimePicker.style.bottom = "auto";
    }
  }
}
