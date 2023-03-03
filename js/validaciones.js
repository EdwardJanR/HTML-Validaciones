export function valida (input) {
  const tipoDeInput = input.dataset.birth;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }
  if (input.validity.valid){
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  }else{
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
  }
}
const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError"
];

const mensajesDeError = {
  nombre: {
    valueMissing:"No ha ingresado un nombre"
  },
  email: {
    valueMissing:"No se ha ingersado el email",
    typeMismatch: "El texto ingresado no comple con el formato de correo ex:@xxxx.com"
  },
  password: {
    valueMissing:"No ha ingresado la clave",
    patternMismatch: "Al menos 6 caracteres, maximo 12, debe contener una letra minuscula, una letramayuscula, un numero y no puede contener caracteres especiales"
  },
  nacimiento: {
    valueMissing: "No ha seleccionado una fechaActual",
    customError: "Debes tener al menos 18 años de edad"
  },
  numero: {
    valueMissing: "Este dato es indispensable para su registro",
    patternMismatch: "Debe cumplir con los 10 digitos de una linea de llamada"
  },
  direccion: {
    valueMissing: "Este dato es indispensable para su registro",
    patternMismatch: "Este data es alfanumerico entre 10 y 40 caracteres"
  },
  ciudad: {
    valueMissing: "Este dato es indispensable para su registro",
    patternMismatch: "debe ingresar la cuidad donde se vive"
  },
  estado: {
    valueMissing: "Este dato es indispensable para su registro",
    patternMismatch: "Debe ingresar el estado donde reside"
  } 
  
}
const validadores = {
  nacimiento: (input) => validarNacimiento(input) 
  }

function mostrarMensajeDeError(tipoDeInput, input){
  let mensaje ="";
  tipoDeErrores.forEach((error) => {
    if(input.validity[error]) {
      console.log(tipoDeInput);
      console.log(input.validity[error]);
      // console.log(mensajesDeError[tipoDeInput][error]);
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  })
  return mensaje;
}

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorEdad(fechaCliente)){
    mensaje = "Desbes ser mayor de 18 años";
  };
  input.setCustomValidity(mensaje);
}

function mayorEdad(fechaCliente) {
  const fechaActual = new Date();
  const fechaMayor = new Date(
    fechaCliente.getUTCFullYear() + 18,
    fechaCliente.getUTCMonth(),
    fechaCliente.getUTCDate()
  );
  console.log(fechaMayor + "--" + fechaActual);
  console.log(fechaMayor <= fechaActual);
  return fechaMayor <= fechaActual;
}


