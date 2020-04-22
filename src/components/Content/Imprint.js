import React from 'react'
import Modal from '../Interfaces/Modal/Modal'
import Terms from './Terms'

export default function Imprint() {
  return (
    <>
      <h2>Impressum</h2>
      <p>
        Sebastian Deol
        <br />
        Jütlandring 11
        <br />
        22419 Hamburg
        <br />
        E-Mail: <a href="mailto:kontakt@ciceroic.com">kontakt@ciceroic.com</a>
        <br />
        Telefon: 0152 53 266 200
        <br />
        Umsatzsteuer-Identifikationsnummer gem. § 27a UStG DE321509298
        <br />
        <Modal size={'medium'}>
          {'Allgemeine Geschäftsbedingungen (AGB) von CICEORIC'}
          <Terms />
        </Modal>
      </p>
      <p>
        Alternative Streitbeilegung gemäß Art. 14 Abs. 1 ODR-VO und § 36 VSBG:
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit, die du unter{' '}
        <a href="https://ec.europa.eu/consumers/odr">
          {' '}
          https://ec.europa.eu/consumers/odr
        </a>
        findest. Zur Teilnahme an einem Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle sind wir nicht verpflichtet und nicht
        bereit.
      </p>
      <h2>Redaktion (Blog & Newsletter)</h2>
      <p>
        Albert Schilling & Sebastian Deol
        <br />
        kontakt@ciceroic.com
        <br />
      </p>
      <h2>Disclaimer</h2>
      <h3>Redaktion</h3>
      <p>
        Alle auf dieser Internetpräsenz verwendeten Texte, Fotos und grafischen
        Gestaltungen sind urheberrechtlich geschützt. Sollten Sie Teile hiervon
        verwenden wollen, wenden Sie sich bitte an den Seitenbetreiber. Er wird
        dann gegebenenfalls den Kontakt zum Urheber oder Nutzungsberechtigten
        herstellen. Eine Haftung für die Richtigkeit der Veröffentlichungen kann
        trotz sorgfältiger Prüfung durch die Redaktion nicht übernommen werden.
        Die Redaktion behält es sich vor eingesendete Inhalte, Briefe, Texte,
        Artikel oder sonstige Medien zu kürzen und zu veröffentlichen. Es
        besteht kein Rechtsanspruch auf Veröffentlichung von Beiträgen auf der
        Website oder APP von CICEROIC. Für unverlangt eingesandte Inhalte an die
        Redaktion, wie Texte, Blogartikel, Videos, Bilder, Illustrationen oder
        sonstige Dateien kann keine Haftung übernommen werden. Mit Übergabe der
        Inhalte an die Redaktion erteilt der Verfasser das Recht zur
        Veröffentlichung. CICEROIC ist nicht verantwortlich für die Inhalte
        externer Internet-Seiten. Links auf solche Seiten werden ohne
        Zueigenmachung der dahinterliegenden Inhalte zu Informationszwecken zur
        Verfügung gestellt. Ein Rechtsanspruch auf die Inanspruchnahme dieses
        Online-Angebotes oder eine Haftung für dessen Nichtverfügbarkeit wird
        nicht übernommen. Dies gilt auch für Folgeschäden.
      </p>
      <h3>Keine Abmahnung ohne vorherigen Kontakt</h3>
      <p>
        Sollte der Inhalt oder die Aufmachung dieser Seiten Rechte Dritter oder
        gesetzliche Bestimmungen verletzen, bitten wir um eine entsprechende
        Nachricht ohne Kostennote. Die Kostennote einer anwaltlichen Abmahnung
        ohne vorhergehende Kontaktaufnahme wird im Sinne der
        Schadensminderungspflicht als unbegründet zurückgewiesen. Hinzu
        verweisen wir auf die AGB, in der ausdrücklich keine Haftung für die
        Inhalte der Nutzer übernommen wird.
      </p>
    </>
  )
}
