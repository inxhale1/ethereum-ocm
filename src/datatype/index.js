'use strict';


import  RawType from  './RawType';
import  DataTimeType from  './DateTimeType';
import  IntegerType from  './IntegerType';
import  PercentType from  './PercentType';
import  AddressType from  './AddressType';

export function detectType(type, typeHint) {


  if (type.substr(0, 4) == 'uint') {
    if (typeHint == 'DateTime')  return DataTimeType;
    if (typeHint == 'Percent') return PercentType;
    else return IntegerType;
  }

  if (type == 'address') return AddressType;

  return RawType;
}


export function detectExecTimeType(type, typeHint) {

  if (type == 'address') return AddressType;

}


export function convertFromRaw(type, typeHint, value) {

  return detectType(type, typeHint).convertFromRaw(value);

}

export function convertToRaw(type, typeHint, value) {
  return detectType(type, typeHint).convertToRaw(value);
}


export function execTimeReplaceConstants(type, typeHint, value, contract) {
  let execTimeConvert = detectExecTimeType(type, typeHint);
  return execTimeConvert ? execTimeConvert.converToRawExecTime(value, contract) : value;
}


export function validate(type, typeHint, value) {
  return detectType(type, typeHint).validate(value);
}