import { Router } from '@angular/router';
import { AnimaisService } from './../animais.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-novo-animal',
  templateUrl: './novo-animal.component.html',
  styleUrls: ['./novo-animal.component.css']
})
export class NovoAnimalComponent implements OnInit {

  formularioAnimal!: FormGroup;
  file!: File;
  preview!: string;
  percentualConcluido = 0;

  constructor(
    private animaisService: AnimaisService,
    private formbuilder: FormBuilder,
    private router: Router,
  )
    { }

  ngOnInit(): void {
    this.formularioAnimal = this.formbuilder.group({
      file:['', Validators.required],
      description:['', Validators.maxLength(300)],
      allowComments: [true]
    })
  }

  upload(){
    const allowComments =
    this.formularioAnimal.get('allowcomments')?.value ?? false;
    const description = this.formularioAnimal.get('descriptino')?.value ?? '';
    this.animaisService.upload(description, allowComments, this.file)
      .pipe(
         finalize(()=>this.router.navigate(['animais']))
         ).subscribe((event: HttpEvent<any>) => {
            if(event.type == HttpEventType.UploadProgress){
              const total = event.total ?? 1
              this.percentualConcluido = Math.round(100 * (event.loaded / total));
            }
         }, (error) =>console.log(error));
  }

  gravaArquivo(arquivo: any):void{
    console.log('tentando gravar o arquivo aki');
    const [file] = arquivo?.files;
    console.log('1 passou');
    this.file = file;
    console.log('2 passou');
    const reader = new FileReader();
    console.log('3 passou');
    reader.onload = (event:any)=>(this.preview=event.target.result);
    console.log('4 passou');
    reader.readAsDataURL(file);
  }

}
