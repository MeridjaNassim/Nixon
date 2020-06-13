import genPass from 'password-generator';


/// type of Password Security levels .
export type PasswordSecurityLevel = "Very High" | "High" | "Medium"  | "Average" | "Low" | "Very Low";


/// configuration used to generate the password
export interface PasswordGenerationConfig  {
    length : number ,
    memorable : boolean,
    hasNumber? : boolean,
    hasSpecialChars?: boolean
}

/// result of computation
export interface PasswordResult {
    name?:string,
    password : string ,
    securityLevel : PasswordSecurityLevel
}

/// Function used to generate secure passwords .
export function generatePassword(config : PasswordGenerationConfig) : PasswordResult {
    let password : string ;
    password = genPass(config.length,config.memorable,/[\w\d\?\-]/);
    return {
        password,
        securityLevel : getSecurityLevel(password)
    }
}

/// Function used to compute the security level of a password.
export function getSecurityLevel(password : string) : PasswordSecurityLevel {
    let points = 0 ;
    var uc = password.match(_UPPERCASE_RE);
  var lc = password.match(_LOWERCASE_RE);
  var n = password.match(_NUMBER_RE);
  var sc = password.match(_SPECIAL_CHAR_RE);
  var nr = password.match(_NON_REPEATING_CHAR_RE);

  if(password.length >= _minLength) points++;
  if(!nr) points++;
  else {
      points -=2;
  }
  if(uc) {
      points++;
      if(uc.length>= _uppercaseMinCount) points++;
  }else {
      points --;
  }
  if(lc) {
      points ++;
      if(lc.length>= _lowercaseMinCount) points++;
  }else {
    points --;
}
  if(n) {
      points++;
      if(n.length>= _numberMinCount) points++
  }else {
    points --;
}
  if(sc) {
      points++ 
      if(sc.length >= _specialMinCount){
          points++;
      }
  }else {
    points --;
}
  if(password.length>= _maxLength) points ++;
  if(password.length >= _minLength) points++;
  else {
      /// if the password is less than minLength is bad password
      points -= 3;
  }
  points =Math.max(points,0);
  let index = Math.min(points  , _SECURITY_LEVELS.length-1)
  return _SECURITY_LEVELS[index]
}




// private variables 

const _maxLength = 18;
const _minLength = 12;
const _uppercaseMinCount = 3;
const _lowercaseMinCount = 3;
const _numberMinCount = 2;
const _specialMinCount = 2;
const _UPPERCASE_RE = /([A-Z])/g;
const _LOWERCASE_RE = /([a-z])/g;
const _NUMBER_RE = /([\d])/g;
const _SPECIAL_CHAR_RE = /([\?\-])/g;
const _NON_REPEATING_CHAR_RE = /([\w\d\?\-])\1{2,}/g;

const _SECURITY_LEVELS : PasswordSecurityLevel[] = [
    "Very Low",
    "Low",
    "Medium",
    "High",
    "Very High"
]