export default ({ path, params = {} }) => {
    let newPath = path + "?";
    for (let p in params) {
        newPath += `${p}=${params[p]}&`
    };
    newPath = newPath.replace(/(&|\?)$/g, "");
    return newPath;
}
