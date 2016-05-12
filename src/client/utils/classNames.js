function toggleClass(element, name) {
    let classes = element.className.split(" ");

    if (_.includes(classes, name)) {
        classes = _.without(classes, name);
    } else {
        classes.push(name);
    }

    element.className = classes.join(" ");
}

export default {
    toggleClass
}
