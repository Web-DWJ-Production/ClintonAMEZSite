import { Component, OnInit, ApplicationRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/* Services */
import { CoreService } from '../../../../services/coreServices';

@Component({
  selector: 'pg-contactus',
  templateUrl: './contactus.html',
  styleUrls: ['./contactus.less']
})
export class ContactUsComponent implements OnInit {
  
  email = {name:null, email:null, type: "General Question", message:null};
  contactForm: FormGroup; 
  formtypes = [ "General Question", "Information", "Prayer Request", "Other"]; 
  lat: number = 39.0959181;
  lng: number = -77.1504537;
  zm: number = 15;

  constructor(private coreService: CoreService) { }
  
  submitForm() {
    if(this.contactForm.valid) {
        alert("Thank you we will get back to you as soon as we can.");
        // submit form
        var form = {
            "to":"",
            "subject": this.contactForm.get('type') + " From ClintonAmez.org",
            "text":this.contactForm.get('message'),
            "html":"<h1>Email From ClintonAmez.org</h1> <b>Name: </b>" + this.contactForm.get('name')
                    + "<br> <b>Email: </b>" + this.contactForm.get('email')
                    + "<br> <b>Type: </b>" + this.contactForm.get('type')
                    + "<br> <b>Message: </b>" + this.contactForm.get('message')
        }
        this.coreService.sendEmail(form).subscribe(res => {
            if(res) { /* Error Message*/ }
            else { /* Send Message */} 
            this.contactForm.reset();
        });        
    }
    else {
        var formErrors = [];
        if(this.contactForm.get('name').invalid) { formErrors.push("Name");}
        if(this.contactForm.get('email').invalid) { formErrors.push("Proper Email Address ex. [myname@gmail.com]");}
        if(this.contactForm.get('type').invalid) { formErrors.push("Message Type");}
        if(this.contactForm.get('message').invalid) { formErrors.push("Message Body");}

        alert("Please correct the following before resubmitting form: \n-" + formErrors.join('\n-'));
    }
  }

  ngOnInit() { 
      this.contactForm = new FormGroup({
          'name': new FormControl(this.email.name, Validators.required),
          'email': new FormControl(this.email.email, [Validators.required, Validators.email]),
          'type': new FormControl(this.email.type, Validators.required),
          'message': new FormControl(this.email.message, Validators.required)
      });
  }   
}
