import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { NavbarComponent } from './core/navbar.component';
import { ModalComponent } from './core/modal.component';
import { FormCategoryComponent } from './components/form-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormProductComponent } from './components/form-product.component';
import { FormEditProductComponent } from './components/form-edit-product.component';
import { FormLoginComponent } from './components/form-login.component';
import { FormRegisterComponent } from './components/form-register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ModalComponent,
    FormCategoryComponent,
    FormProductComponent,
    FormEditProductComponent,
    FormLoginComponent,
    FormRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
