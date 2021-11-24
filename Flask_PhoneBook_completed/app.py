from flask import Flask, render_template, request, redirect, flash
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///contactlist.db'
db = SQLAlchemy(app)
app.secret_key = 'contactbook keys'

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)   
    name = db.Column(db.String(200), nullable=False)
    phonenumber = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return '<Task %r' % self.id


@app.route('/', methods=['POST', 'GET'])
def index():
    tasks = Todo.query.all()
    return render_template('index.html', tasks=tasks)

@app.route('/add', methods=['GET'])
def add():
    return render_template('newcontact.html')

@app.route('/addphonebook', methods=['POST'])
def addphonebook():
    if request.method == 'POST':     
        name = request.form['name']
        phonenumber = request.form['phonenumber']  

        if len(name) > 5:
            flash ('Name is too long')
            return render_template('newcontact.html')

        new_task = Todo(name=name, phonenumber = phonenumber)
        
        try:
            db.session.add(new_task)
            db.session.commit()
            return redirect('/')
        except:
            return 'There was an issue adding contact'

@app.route('/update/<int:id>', methods=['GET','POST'])
def update(id):
    task = Todo.query.get_or_404(id)
    
    if request.method =='POST':
        task.name = request.form['name']
        task.phonenumber = request.form['phonenumber']

        try:
            db.session.commit()
            return redirect('/')
        except:
            return 'There was an issue updating this contact'

    else:
        return render_template('update.html', task=task)

@app.route('/delete/<int:id>')
def delete(id):
    task_to_delete = Todo.query.get_or_404(id)

    try:
        db.session.delete(task_to_delete)
        db.session.commit()
        return redirect('/')
    except:
        return 'There was a problem deleting this contact'



if __name__ == "__main__":
    app.run(debug=True)