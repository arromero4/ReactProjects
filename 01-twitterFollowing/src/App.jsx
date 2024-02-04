import { TwitterFollowCard }  from "./TwitterFollowCard";

const users = [
  {
    id:1,
    userName:'arromero491',
    name: 'Andres Romero',
    isFollowing: true
  },
  {
    id:2,
    userName:'midudev',
    name: 'Miguel Angel Duran',
    isFollowing: false
  },
  {
    id:3,
    userName:'yoshimi_robot',
    name: 'Yoshimi O Neil',
    isFollowing: true
  }
]

export function App() {
  
  return (
        <section className="App">
      {
        users.map(user => {
          const {id, userName, name, isFollowing} = user
          console.log(userName)
          return(
            <TwitterFollowCard
              key={id}
              userName={userName}
              initialIsFollowing={isFollowing}
            >
              {name}
            </TwitterFollowCard>
          )
        })
      }
    </section>
  );
}
