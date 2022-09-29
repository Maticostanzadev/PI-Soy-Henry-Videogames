import React from "react";
import { render, screen } from '@testing-library/react'
import Create from '../components/Create/Create'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from '../redux/store/index'

beforeEach(() => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Create />
      </BrowserRouter>
    </Provider>
  );
});
let component = document.body;
describe('Formulario', () => {

  xit('Contiene una etiqueta "form"', () => {
    expect(component.querySelector('form')).toBeTruthy();
  });

  xit('Contiene un input de tipo texto para escribir el nombre', () => {
    expect(component.querySelector('input').type).toEqual('text');
    expect(component.querySelector('input').name).toEqual('name')
  })

  xit('Contiene un input de tipo date para agregar la fecha de lanzamiento', () => {
    expect(component.querySelectorAll('input')[1].type).toEqual('date');
    expect(component.querySelectorAll('input')[1].name).toEqual('release_date')
  })

  xit('Contiene un input de tipo number para agregar el rating', () => {
    expect(component.querySelectorAll('input')[2].type).toEqual('number');
    expect(component.querySelectorAll('input')[2].name).toEqual('rating')
  })

  xit('Contiene una etiqueta textarea para agregar la descripción', () => {
    expect(component.querySelector('textarea')).toBeTruthy();
    expect(component.querySelector('textarea').name).toEqual('description')
  })

  xit('Contiene una etiqueta select para los géneros y otra para las plataformas', () => {
    expect(component.querySelectorAll('select')[0]).toBeTruthy();
    expect(component.querySelectorAll('select')[0].name).toEqual('genres')
    expect(component.querySelectorAll('select')[1]).toBeTruthy();
    expect(component.querySelectorAll('select')[1].name).toEqual('platforms')
  })

  xit('Contiene un input de tipo text para agregar la url de la imagen y una etiqueta img para la previsualización de la misma', () => {
    expect(component.querySelectorAll('input')[3].type).toEqual('text');
    expect(component.querySelectorAll('input')[3].name).toEqual('background_image')
    expect(component.querySelector('img')).toBeTruthy();
  })

  xit('Contiene un botón para enviar el formulario que en principio está deshabilitado', () => {
    expect(component.querySelector('button')).toBeTruthy();
    expect(component.querySelector("button[disabled]")).toBeTruthy();
  })
})