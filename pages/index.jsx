import config from '../config.json';
import styled from 'styled-components';
import { CSSReset } from '../src/components/CSSReset';
import Menu from '../src/components/Menu';
import { StyledTimeline } from '../src/components/Timeline';

function HomePage() {
  const estilosHomePage = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  };

  return (
    <>
      <CSSReset />
      <div style={estilosHomePage}>
        <Menu />
        <Header />
        <Timeline playlists={config.playlists}>
          Conteúdo
        </Timeline>
      </div>
    </>
  );
}

export default HomePage;

const StyledHeader = styled.div`
  img {
    border-radius: 50%;
    height: 80px;
    width: 80px;
  }

  .user-info {
    align-items: center;
    display: flex;
    gap: 16px;
    margin-top: 50px;
    padding: 16px 32px;
    width: 100%;
  }
`;

function Header() {
  return (
    <StyledHeader>
      {/* <img src="banner" /> */}

      <section className='user-info'>
        <img src={`https://github.com/${config.github}.png`} />

        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}

function Timeline(props) {
  const playlistNames = Object.keys(props.playlists);

  return (
    <StyledTimeline>
      {playlistNames.map(playlistName => {
        const videos = props.playlists[playlistName];

        return (
          <section>
            <h2>{playlistName}</h2>

            <div>
              {videos.map(video => {
                return (
                  <a href={video.url}>
                    <img src={video.thumb} />

                    <span>
                      {video.title}
                    </span>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
}