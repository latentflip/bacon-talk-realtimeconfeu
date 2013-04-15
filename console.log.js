function getName(obj) { 
   var funcNameRegex = /function (.{1,})\(/;
   var results = (funcNameRegex).exec((obj).constructor.toString());
   return (results && results.length > 1) ? results[1] : "";
};

function stringifySomething(something, nest) {
  if (typeof something === "function") {
    return something.toString();
  } else if (Object.prototype.toString.call( something ) === '[object Array]') {
    return stringifyArray(something);
  } else if (typeof something == "object") {
    return stringifyObject(something, nest);
  } else if (typeof something == "string") {
    return "'"+something.toString()+"'";
  } else {
    return something.toString();
  }
}

function stringifyArray(array) {
  return '['+array.toString()+']';
}

function stringifyObject(obj, nest) {
  if (nest) {
    var names = [];
    names = _(obj).keys().slice(0,3);
    var ellipses = names.length > 3 ? ", ...}" : "}";
    names = names.slice(0,3);

    var objName = getName(obj);
    objName = objName === "Object" ? "" : objName;
    return objName + "{" +
            _.map(names, function(n) {
              return n + ": " + stringifySomething(obj[n]);
            }).join(', ') +
          ellipses;
  } else {
    return getName(obj);
  }
}

function clog(thing) {
  return stringifySomething(thing, true);
}
