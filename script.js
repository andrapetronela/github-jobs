class App extends React.Component {
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
            bell.classList.add('ring');
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
            
    })
    
    const bell = document.querySelector('.header__page__bell');
    
    }
    
    searchHandler = (ev) => {
                
        this.setState({
            search: ev.target.value,
        });
    }
     
    render() {        
        const randomNr = (i) => {
            for (let x = 0; x <= this.state.jobs.length; x++) {
                const viewsArr = [];
                 let views = Math.floor(Math.random() * 50);
                 viewsArr.push(views);
                 return viewsArr[x];
            }   
        }
               
        const searchedJob = this.state.jobs.filter(job => {
            const rgx = this.state.search.toLowerCase();
            return job.location.toLowerCase().includes(rgx);
        });
        
        
        const jobs = searchedJob.map((job, index) => {
            let d = this.state.jobs[index].created_at;
            d = d.split(' ');
            const my_date = d[2] + ' ' + d[1] + ' ' + d[5];
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
                        <h1>
                            { this.state.jobs[index].title.length > 30 ? this.state.jobs[index].title.slice(0, 30) + ' ...' : this.state.jobs[index].title}
                        </h1>
                        <p> <span>Type: </span>
                                     {this.state.jobs[index].type}
                        </p>
                        <p> <span>Location: </span> 
                                     {searchedJob[index].location}
                        </p>
                        <p> <span>Company: </span> 
                                     { this.state.jobs[index].company.length > 30 ? this.state.jobs[index].company.slice(0, 30) + '...' : this.state.jobs[index].company }
                        </p>
                        <p><span>Posted: </span> { my_date }</p>
                        <p className="card__icons">
                            <span> <i className="far fa-eye eye__icon github-icon"></i></span> { randomNr(index) }
                            <span><i className="fas fa-code-branch branch__icon github-icon"></i></span>{ randomNr(index) }
                            <span><i className="fas fa-star star__icon github-icon"></i></span> {randomNr(index)}
                        </p>
                        <a href={this.state.jobs[index].url} target='_blank' className="card__button">
                            <i className="fas fa-book book__icon"></i> Read more
                        </a>
                    </section>
                </div>
            )
        })
        return (
            <div className='container'>
                <Header searchHandler={this.searchHandler} value={this.state.search}/>
                <Homepage />
                <main className="cards-container">
                    { jobs }
                </main>
                <Footer />
            </div>
        )
    }
}


const Header = ({ search, searchHandler }) => {
    return (
        <div>
            <header className="header__page">
                    <div className="header__logo">
                        <a href="https://github.com/" target="_blank"><i className="fab fa-github"></i></a>
                        <Search searchHandler={searchHandler} value={search} />
                    </div>
                    
                    <div className="header__page-right">
                        <i className="fas fa-bell header__page__bell"></i>
                    </div>
                </header>
        </div>
    )
}

const Search = ({ search, searchHandler }) => {
        return (
            <input 
            className="searchBox" 
            type="text" 
            value={search} 
            placeholder="Search jobs by location" 
            onChange={searchHandler} />
    )
}

const Homepage = () => {
    return (
        <div>
            <section className="hero-section">
                    <div className="title">
                            <a href="https://jobs.github.com/" target="__blank" className="title__github-link">GitHub Jobs</a>
                            <p>for <span>great</span> developers</p>
                    </div>
                    <div className="hero-section-image-container">
                        <img src="assets/images/github.svg" className="hero-image"/>
                    </div>
            </section>
        </div>
    )
}

const Footer = () => {
    const d = new Date();
    const year = d.getFullYear();
    return (
        <div>
            <footer>
                    <section className="footer__left">
                        <p>@ { year } GitHub, Inc.</p>
                        <a href="https://help.github.com/articles/github-terms-of-service/" target="_blank">Terms</a>
                        <a href="https://help.github.com/articles/github-privacy-statement/" target="_blank">Privacy</a>
                        <a href="https://github.com/security" target="_blank">Security</a>
                        <a href="https://www.githubstatus.com/" target="_blank">Status</a>
                        <a href="https://help.github.com/" target="_blank">Help</a>
                    </section>
                    <i className="fab fa-github footer__icon"></i>
                    <section className="footer__right">
                        <a href="https://github.com/contact" target="_blank">Contact GitHub</a>
                        <a href="https://github.com/pricing" target="_blank">Pricing</a>
                        <a href="https://developer.github.com/" target="_blank">API</a>
                        <a href="https://services.github.com/" target="_blank">Training</a>
                        <a href="https://github.blog/" target="_blank">Blog</a>
                        <a href="https://github.com/about" target="_blank">About</a>
                    </section>
                </footer>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));