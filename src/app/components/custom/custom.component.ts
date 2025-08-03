import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CapitalizePipe } from '../../core/custom-pipes/capitalize.pipe';
import { GstCalculatorPipe } from '../../core/custom-pipes/gst-calculator.pipe';
import { HighlightDirective } from '../../core/custom-directives/highlight.directive';

@Component({
  selector: 'app-custom',
  imports: [FormsModule, CapitalizePipe, GstCalculatorPipe, HighlightDirective],
  templateUrl: './custom.component.html',
  styleUrl: './custom.component.scss'
})
export class CustomComponent {

  inputText: string = '';
  withoutGST: number = 0;


}
