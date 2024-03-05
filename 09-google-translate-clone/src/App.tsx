import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { useStore } from './hooks/useStore';
import { Container, Row, Col, Button, Stack } from 'react-bootstrap';
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants';
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/Icons';
import { LanguageSelector } from './components/LanguageSelector';
import { SectionType } from './types.d';
import { TextArea } from './components/TextArea';
import { useEffect } from 'react';
import { translate } from './services/translate';
import { useDebounce } from './hooks/useDebounce';

function App() {
  const {
    loading,
    fromLanguage,
    toLanguage,
    fromText,
    result,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  } = useStore()

  const debounceFromText = useDebounce(fromText, 250)

  useEffect(() => {
    if(debounceFromText === '') return 

    translate({ fromLanguage, toLanguage, text: debounceFromText})
    .then(result => {
      if(result == null) return
      console.log(result)
      setResult(result)
    })
    .catch(() => {
      setResult('Error')
    })
  

  }, [debounceFromText, fromLanguage, toLanguage, setResult]);

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {})
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]
    utterance.rate = 0.80
    speechSynthesis.speak(utterance)
  }
  
  return (
    <Container fluid>
      <h1>Google Translate</h1>

      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage} />
            <TextArea
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
            />
          </Stack>

        </Col>

        <Col xs='auto'>
          <Button
            variant='link'
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}>
            <ArrowsIcon />
          </Button>
        </Col>


        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage} />
              <div style={{ position: 'relative' }}>
                
           
            <TextArea
              loading={loading}
              type={SectionType.To}
              value={result}
              onChange={setResult}
            />
            <div style={{ position: 'absolute', left: 0, bottom:0, display: 'flex' }}>
            <Button variant='link'  onClick={handleClipboard}>
              <ClipboardIcon />
            </Button>
            <Button variant='link'  onClick={handleSpeak}>
              <SpeakerIcon />
            </Button>
            </div>
            

               </div>
          </Stack>

        </Col>
      </Row>

    </Container>
  )
}

export default App
