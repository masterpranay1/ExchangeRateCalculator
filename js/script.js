const body = document.querySelector('body');

document.querySelector('i.fa-sun').addEventListener('click', function(){
    // console.log('hi');
    body.classList.toggle('dark-theme');
});

document.querySelector('div.custom button').addEventListener('click', function(){
    document.querySelector('section').style.transform = 'translateY(0)';
});