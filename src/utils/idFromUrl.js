export default function idFromUrl(url){
    let arr = url.split("/");
    let id = arr[arr.length - 2];
    return id;
};
