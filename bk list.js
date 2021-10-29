
class book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

class ui{
    
    static linecount=0;

    static storeToDisplay(){
        let book=storage.getBook();

        book.forEach((books)=>{
            console.log(books);
            ui.displayBook(books);
        })
    }

    static displayBook(book){
        let tr=document.createElement('tr');

        let td1=document.createElement('td');
        td1.textContent=`${book['title']}`;
        let td2=document.createElement('td');
        td2.textContent=`${book['author']}`;
        let td3=document.createElement('td');
        td3.textContent=`${book['isbn']}`;
        let td4=document.createElement('td');
        td4.className='btn btn-danger btn-sm delet';
        td4.textContent='X';

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        let table = document.getElementById('table');

        table.appendChild(tr);

        this.linecount++;

        ui.hideTable()
    }

    static hideTable(){
        let table=document.getElementById('table');
        if(this.linecount>0){
            table.style.display='';
        }
        else{
            table.style.display='none'
        }
    }

    static removebookList(){
        document.getElementById('title').value='';
        document.getElementById('author').value='';
        document.getElementById('isbn').value='';
    }

    static displayMassage(book){
        if(book['title']==='' || book['author']==='' || book['isbn']===''){
            ui.showalert('plese fill all feilds','danger');
        }
        else{
            ui.showalert('book successfully saved','success')
        }
    }

    static showalert(massage,color){
        let div=document.createElement('div');
        div.className=`alert alert-${color} form-control mt-3`;
        div.textContent=massage;
        let parent=document.querySelector('div');
        let formNode=document.querySelector('form');
        parent.insertBefore(div,formNode);

        setTimeout(()=>document.querySelector('.alert').remove(),1000);
    }

    static deletNode(el){

        if(el.classList.contains('delet')){
            if(confirm(`Are You Sur About This`)){
                el.parentElement.remove();
                ui.showalert(`Iteam Removed Form List`,`danger`);
                this.linecount--;
                this.hideTable();
            }   
        }
    }  
}

class storage{

    static getBook(){
        let book;
        if(localStorage.getItem('books')===null){
            book=[];
        }
        else{
            book=JSON.parse(localStorage.getItem('books'));
        }

        return book;
    }

    static addBook(books){
        let book=storage.getBook();
        book.push(books);
        localStorage.setItem("books",JSON.stringify(book));
     }

    static removeBook(isbn){
        let book=storage.getBook();

        book.forEach((books,index)=>{
           if( books['isbn']===isbn){
               book.splice(index,1);
           }
        });
        localStorage.setItem("books",JSON.stringify(book));
        
    }
}

document.getElementById('form').addEventListener('submit',(e) =>{

    e.preventDefault();

let book={
    'title': document.getElementById('title').value,
    'author':document.getElementById('author').value,
    'isbn':document.getElementById('isbn').value,
}

    storage.addBook(book);
    ui.displayBook(book);
    ui.removebookList();
    ui.displayMassage(book);
  
})

document.getElementById('table').addEventListener('click',(x)=>{

   ui.deletNode(x.target);

   //console.log(x.target.previousElementSibling.textContent);

   storage.removeBook(x.target.previousElementSibling.textContent);

})

window.onload=ui.hideTable;
window.onload=ui.storeToDisplay;