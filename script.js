class Jobs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            user: [],
            cities: [],
            search: '',
        }
    this.searchHandler = this.searchHandler.bind(this);
    }
    
    componentDidMount() {
        fetch('https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?search=python') 
            .then(response => response.json())
            .then(data => {
                this.setState({
                    jobs: data
                })
            })
            .catch(err => console.log(err));
        
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
    })}
    
    searchHandler = (ev) => {
                
        this.setState({
            search: ev.target.value,
        });
    }
     
    render() {
       
        const searchedJob = this.state.jobs.filter(job => {
            const rgx = this.state.search.toLowerCase();
            return job.location.toLowerCase().includes(rgx);
        });
        
        
        const jobs = searchedJob.map((job, index) => {
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
                        <p><span>Location: </span> {searchedJob[index].location}</p>
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
                        <a href="https://github.com/" target="_blank"><i className="fab fa-github"></i></a>
                        <Search searchHandler={this.searchHandler} value={this.state.search} />
                    </div>
                    <div className="header__page-left">
                        <a href="https://jobs.github.com/" target="__blank" className="header__github-link">GitHub Jobs</a>
                        <p>Researching the best jobs</p>
                    </div>
                    <div className="header__page-right">
                        <i className="fas fa-bell header__page__icon"></i>
                    </div>
                </header>
                <main className="cards-container">
                    { jobs }
                </main>
                
            </div>
        )
    }
}

class Search extends React.Component {
    render() {
        return (
            <input className="searchBox" type="text" value={this.props.search} placeholder="Search by location" onChange={this.props.searchHandler} />
    )
    }
}

ReactDOM.render(<Jobs />, document.getElementById('root'));