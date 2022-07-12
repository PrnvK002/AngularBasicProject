import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.css']
})
export class SuccessMessageComponent implements OnInit {

  @Input() message:string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
