import config from '../config.json';
import styled from 'styled-components';
import { CSSReset } from '../src/components/CSSReset';
import Menu from '../src/components/Menu';
import { StyledTimeline } from '../src/components/Timeline';
import { useState } from 'react';

function HomePage() {
  const estilosHomePage = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  };
  const [valorDoFiltro, setValorDoFiltro] = useState('');

  return (
    <>
      <CSSReset />
      <div style={estilosHomePage}>
        <Menu
          valorDoFiltro={valorDoFiltro}
          setValorDoFiltro={setValorDoFiltro}
        />
        <Header />
        <Timeline
          searchValue={valorDoFiltro}
          playlists={config.playlists}>
          Conteúdo
        </Timeline>
      </div>
    </>
  );
}

export default HomePage;

const StyledHeader = styled.div`
  .user-avatar {
    border-radius: 50%;
    height: 80px;
    width: 80px;
  }

  .banner {
    height: 400px;
    object-fit: cover;
    width: 100%;
  }

  .user-info {
    align-items: center;
    display: flex;
    gap: 16px;
    padding: 16px 32px;
    width: 100%;
  }
`;

const StyledBanner = styled.div`
  background-color: blue;
  background-image: url(${({ bg }) => bg});
  height: 230px;
`;

function Header() {
  return (
    <StyledHeader>
      <StyledBanner bg={config.bg} />
      <section className='user-info'>
        <img className='user-avatar' src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}

function Timeline({ searchValue, ...props }) {
  const playlistNames = Object.keys(props.playlists);

  return (
    <StyledTimeline>
      {playlistNames.map(playlistName => {
        const videos = props.playlists[playlistName];

        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos.filter((video) => {
                const titleNormalized = video.title.toLowerCase();
                const searchValueNormalized = searchValue.toLowerCase();

                return titleNormalized.includes(searchValueNormalized);
              }).map(video => {
                return (
                  <a key={video.url} href={video.url}>
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
