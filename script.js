class Jobs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            user: []
        }
    }
    
    componentDidMount() {
        fetch('https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?search=code') 
            .then(response => response.json())
            .then(data => {
                this.setState({
                    jobs: data
                })
            });
        
        fetch('https://randomuser.me/api/?results=100')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    user: data.results
                })
            })
            .catch(err => console.log(err))
    }
     
    render() {

        const jobs = this.state.jobs.map((job, index) => {
            let d = this.state.jobs[index].created_at;
                d = d.split(' ');
                let my_date = d[2] +' ' + d[1] + ' ' + d[5];
            return (
                <div className="card" key={index}>
                    <header className="card__header">
                        <div className="card__image">
                            <img src={this.state.user[index].picture.medium} alt="user" />
                        </div>
                    </header>
                    <section className="card__body">
                        <h1>{ this.state.jobs[index].title.length > 30 ? this.state.jobs[index].title.slice(0, 30) + ' ...' : this.state.jobs[index].title}</h1>
                        <p><span>Type: </span>{this.state.jobs[index].type}</p>
                        <p><span>Location: </span> {this.state.jobs[index].location}</p>
                        <p><span>Company: </span> { this.state.jobs[index].company.length > 30 ? this.state.jobs[index].company.slice(0, 30) + '...' : this.state.jobs[index].company }</p>
                        <p><span>Posted: </span> { my_date }</p>
                        <a href={this.state.jobs[index].url} target='_blank' className="card__button">
                            Read more
                        </a>
                    </section>
                </div>
            )
        
        })
        return (
            <div className='container'>
                <header className="header__page">
                    <h1>GitHub Jobs</h1>
                    <p>Researching the best developers</p>
                </header>
                <main className="cards-container">
                    { jobs }
                </main>
                
            </div>
        )
    }
}



ReactDOM.render(<Jobs />, document.getElementById('root'));