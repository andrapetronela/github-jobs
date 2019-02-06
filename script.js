class Jobs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            user: [],
            cities: [],
        }
    }
    
    componentDidMount() {
        fetch('https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?search=python') 
            .then(response => response.json())
            .then(data => {
                this.setState({
                    jobs: data
                })
            })
//            .catch(err => console.log(err));
        
        fetch('https://randomuser.me/api/?results=100')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    user: data.results
                })
            })
            .catch(err => console.log(err));
        fetch('https://pixabay.com/api/?key=11478607-0eb32deca43fc9d409ff4f730&q=city&per_page=200')
            .then(response => response.json())
            .then(data => { 
                this.setState({
                    cities: data.hits
                    })
            console.log(this.state.cities[0].webformatURL)
    })}
     
    render() {

        const jobs = this.state.jobs.map((job, index) => {
            let d = this.state.jobs[index].created_at;
                d = d.split(' ');
                let my_date = d[2] +' ' + d[1] + ' ' + d[5];
            return (
                <div className="card" key={index}>
                    <header className="card__header">
                        <div className="card__city">
                            <img src={this.state.cities[index].webformatURL} alt="city" />
                        </div>
                        <div className="card__user">
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
                    <div className="header__logo">
                        <i className="fab fa-github"></i>
                    </div>
                    <div className="header__page-left">
                        <h1>GitHub Jobs</h1>
                        <p>Researching the best developers</p>
                    </div>
                    <div className="header__page-right">
                        
                    </div>
                </header>
                <main className="cards-container">
                    { jobs }
                </main>
                
            </div>
        )
    }
}



ReactDOM.render(<Jobs />, document.getElementById('root'));