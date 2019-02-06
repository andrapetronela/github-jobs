class Jobs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            user: []
        }
    }
    
    componentDidMount() {
        fetch('https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=python') 
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
                        <h1>{this.state.jobs[index].title}</h1>
                        <p>{this.state.jobs[index].type}</p>
                        <p>Location: {this.state.jobs[index].location}</p>
                        <p>Company: {this.state.jobs[index].company}</p>
                        <p>Date: { my_date }</p>
                        <a href={this.state.jobs[index].url} target='_blank'>
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
                    <p>Researching Python developers</p>
                </header>
                <main className="cards-container">
                    { jobs }
                </main>
                
            </div>
        )
    }
}



ReactDOM.render(<Jobs />, document.getElementById('root'));