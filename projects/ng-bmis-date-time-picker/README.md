# ng-bmis-date-time-picker

`ng-bmis-date-time-picker` is a simple date-time picker component for Angular applications. It allows users to easily select a date and time from a dropdown interface.

## Features

- Date and time selection
- Dropdown calendar with navigation between months and years
- Easy integration with any Angular project

## Installation

To install this package, run the following command:

```bash
npm install ng-bmis-date-time-picker
```
Usage

Import the module
First, you need to import the NgBmisDateTimePickerModule in your Angular application's module.

```typescript
import { NgBmisDateTimePickerModule } from 'ng-bmis-date-time-picker';

@NgModule({
  declarations: [...],
  imports: [
    NgBmisDateTimePickerModule,
    ...
  ],
  providers: [...],
  bootstrap: [...]
})
export class AppModule {}
```

Add the component to your template

You can now use the ng-bmis-date-time-picker component in your Angular templates.

```html
<ng-bmis-date-time-picker (dateTimeChange)="onDateTimeChange($event, 'controlNameExample')">
  <input type="text" class="form-control" formContarolName="controlNameExample">
</ng-bmis-date-time-picker>
```
Handle the dateTimeChange event
In your component, you can handle the date-time selection using the dateTimeChange output event:

```typescript
export class YourComponent {
  onDateTimeChange(selectededDateTime: string, controlNameExample: string) {
    this.formGroupExample.get(controlNameExample).setValue(selectededDateTime);
  }
}
```
Configuration
The component automatically adjusts based on available space and emits the selected date-time in YYYY-MM-DD HH:MM format. However, you can add additional functionality by tweaking the component code.

Options
dateTimeChange (EventEmitter<string>): Emits the selected date-time in the format YYYY-MM-DD HH:MM.
Development
To contribute or modify the package, clone the repository and run the following command to build:

```bash
npm run build
```
License
This project is licensed under the MIT License.