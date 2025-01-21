import { cookies } from 'next/headers'
import Image from 'next/image'
import { BsChevronDoubleDown } from 'react-icons/bs'
import React from 'react'

const Bio = () => {
  const cookieStore = cookies()
  const language = cookieStore.get('language')?.value || 'fr'

  // Define the content in both French and English
  const content = {
    fr: {
      title: 'Formations artistiques',
      artisticTraining: [
        '1968/1970 Beaux-Arts Toulouse CDS Dessin M.Espinasse',
        '2008 Formation au tirage Platine Palladium : L.Lafolie, France',
        '2010 Résidence « One to one Expert, Platine Palladium » : Dick Arentz, Flagstaff-USA',
        "2014 Rencontre « Aux limites de l'acte photographique » : A.D'Agata, Arles, France",
      ],
      organizerTitle: 'Organisateur, Animateur, Conférencier',
      organizer: [
        'Animateur Atelier couleurs en duo avec Johanna Senpau',
        'Animateur Atelier « Autour du portrait et du corps » à La chambre grand format argentique',
        'Animateur de 4 Résidences photographiques de juillet à La Maison Jaune, Revel',
        'Animateur de 5 ateliers « Approche de la photographie de nu en studio »',
        "Conférencier pour l'AFP « Démarche d'auteur »",
        "Conférencier ASS Poussière d'Images « L'autoportrait, démarche d'auteur »",
      ],
      exhibitionsTitle: 'Expositions et publications',
      exhibitions: [
        'Série " Klein d\'œil" dans la revue d\'art "AZART N°15"',
        'Galerie Numeriphot Toulouse " Klein d\'œil"',
        'Chemins des artistes, série « Intimités »',
        'Les Echappées Belles, Espace Beaurepaire Paris « série »Survol »',
        'Prix CANSON "Couleur Bleue" pour "Anouchka Klein d\'œil"',
        'Arts Vagabonds "Galerie Libre Cours" série "Carrés intimes"',
        'CNIT La Défense Paris, extraits de " Klein d\'œil"',
        'Reportage et 1° de couverture sur la revue "EXCLUSIVE BRAZIL MUNDO"',
        '2 couvertures de magazine "EXCLUSIVE BRAZIL MUNDO", série " Klein d\'œil"',
        'Galerie ATYPIC, série Portraits de Femmes',
        'Artistes à suivre, Galerie l’Atelier à Cassaignes, série " Klein d\'œil"',
        'Arts Vagabonds, Le Château St Félix Lauragais, série " Klein d\'œil"',
        'Voyage du Monde Revel, série “Afrique du Sud sauvage”',
        'Artistes à suivre SERRES, série “Bas les Masques”',
        'L’invité d’Arts Vagabonds, Château de Saint-Julia, série « Incertitudes »',
        'Siège social de la Banque Courtois Toulouse : Série des « Ailes Anciennes »',
        "Salon Créativ'Art Toulouse",
        'Galerie Numeriphot Toulouse " Abemous papam"',
        'Galerie DESVENDA, Porto, Portugal « En Suspension(s) »',
        'Invité d’honneur photographe Festival du film insolite, Renne-le-château « Immortalem »',
        'Salon Européen d’art de Carcassonne " Abemous Papam" Grand Prix',
        'Galerie des Bains Villemur/Tarn, Invité d’honneur Série « Abandon(s) »',
        'Vietnam Hôpital de Tan-Hoa, reportage pour “Children Action”',
        'Édition d’un livre Mission Than-Hôa présentant le reportage du Vietnam, format 25 X 32, 116 pages tirage 1200 ex',
        '44° Salon d’Automne de Colomiers " Abemous Papam" Grand Prix Henri Molina',
        'Les 111 des Arts Hôtel-Dieu Toulouse',
        'Invité d’Honneur du 43° Salon d’Automne de Colomiers, série " Mon corps est ma toile"',
        'NUMERIPHOT Toulouse, Exposition : « New-York-M240 »',
        'Les 111 des Arts Hôtel-Dieu Toulouse',
        '86° Salon des Méridionaux : « Minotaurus »',
        'Galerie ARTIEMPO Toulouse : « Corps et déchirures »',
        "11° FEPN Arles, série 'JE' contre le ‘MOI’",
        'Galerie de l’ECHARPE Toulouse, série " Abemous Papam"',
        "6° Rencontres Focale-nu-art, série 'Le JE' contre le ‘MOI’",
        'Off des 21° VoiesOff Arles avec le Collectif APPROCHE-PHOTO, séries “Soumissions”',
        'Galerie Dominique.C, Château d’Auriac, série " Mon corps est ma toile"',
        'Château-H St Julia, série " Abemous Papam"',
        'Artistes à suivre, « Dante l’Inferno »',
      ],
    },
    en: {
      title: 'Artistic Training',
      artisticTraining: [
        '1968/1970 Beaux-Arts Toulouse CDS Drawing M.Espinasse',
        '2008 Platinum Palladium Printing Course: L.Lafolie, France',
        '2010 Residency « One to one Expert, Platinum Palladium »: Dick Arentz, Flagstaff-USA',
        "2014 Encounter « At the Limits of the Photographic Act »: A.D'Agata, Arles, France",
      ],
      organizerTitle: 'Organizer, Facilitator, Speaker',
      organizer: [
        'Facilitator of a Color Workshop with Johanna Senpau',
        'Facilitator of a workshop « Around the portrait and the body » at La chambre grand format argentique',
        'Facilitator of 4 photographic residencies in July at La Maison Jaune, Revel',
        'Facilitator of 5 workshops « Approach to nude photography in the studio »',
        "Speaker for AFP « Author's Approach »",
        "Speaker ASS Poussière d'Images « The self-portrait, author's approach »",
      ],
      exhibitionsTitle: 'Exhibitions and Publications',
      exhibitions: [
        'Series " Klein d\'œil" in the art journal "AZART N°15"',
        'Numeriphot Gallery Toulouse " Klein d\'œil"',
        'Chemins des artistes, series « Intimacies »',
        'Les Echappées Belles, Beaurepaire Space Paris « series »Survol »',
        'Prix CANSON "Couleur Bleue" pour "Anouchka Klein d\'œil"',
        'Arts Vagabonds "Galerie Libre Cours" série "Carrés intimes"',
        'CNIT La Défense Paris, extraits de " Klein d\'œil"',
        'Reportage et 1° de couverture sur la revue "EXCLUSIVE BRAZIL MUNDO"',
        '2 couvertures de magazine "EXCLUSIVE BRAZIL MUNDO", série " Klein d\'œil"',
        'Galerie ATYPIC, série Portraits de Femmes',
        'Artistes à suivre, Galerie l’Atelier à Cassaignes, série " Klein d\'œil"',
        'Arts Vagabonds, Le Château St Félix Lauragais, série " Klein d\'œil"',
        'Voyage du Monde Revel, série “Afrique du Sud sauvage”',
        'Artistes à suivre SERRES, série “Bas les Masques”',
        'L’invité d’Arts Vagabonds, Château de Saint-Julia, série « Incertitudes »',
        'Siège social de la Banque Courtois Toulouse : Série des « Ailes Anciennes »',
        "Salon Créativ'Art Toulouse",
        'Galerie Numeriphot Toulouse " Abemous papam"',
        'Galerie DESVENDA, Porto, Portugal « En Suspension(s) »',
        'Invité d’honneur photographe Festival du film insolite, Renne-le-château « Immortalem »',
        'Salon Européen d’art de Carcassonne " Abemous Papam" Grand Prix',
        'Galerie des Bains Villemur/Tarn, Invité d’honneur Série « Abandon(s) »',
        'Vietnam Hôpital de Tan-Hoa, reportage pour “Children Action”',
        'Édition d’un livre Mission Than-Hôa présentant le reportage du Vietnam, format 25 X 32, 116 pages tirage 1200 ex',
        '44° Salon d’Automne de Colomiers " Abemous Papam" Grand Prix Henri Molina',
        'Les 111 des Arts Hôtel-Dieu Toulouse',
        'Invité d’Honneur du 43° Salon d’Automne de Colomiers, série " Mon corps est ma toile"',
        'NUMERIPHOT Toulouse, Exposition : « New-York-M240 »',
        'Les 111 des Arts Hôtel-Dieu Toulouse',
        '86° Salon des Méridionaux : « Minotaurus »',
        'Galerie ARTIEMPO Toulouse : « Corps et déchirures »',
        "11° FEPN Arles, série 'JE' contre le ‘MOI’",
        'Galerie de l’ECHARPE Toulouse, série " Abemous Papam"',
        "6° Rencontres Focale-nu-art, série 'Le JE' contre le ‘MOI’",
        'Off des 21° VoiesOff Arles avec le Collectif APPROCHE-PHOTO, séries “Soumissions”',
        'Galerie Dominique.C, Château d’Auriac, série " Mon corps est ma toile"',
        'Château-H St Julia, série " Abemous Papam"',
        'Artistes à suivre, « Dante l’Inferno »',
      ],
    },
  }

  const currentContent = content[language]

  return (
    <div>
      <div className="xl:h-[75vh] pt-12 xl:grid xl:grid-cols-2 bg-white text-gray-500 xl:mx-[10vw]">
        <div className="flex items-center justify-start xl:justify-center">
          <div className="relative flex flex-col items-center xl:justify-center h-[300px] xl:h-[500px] w-[200px] xl:w-[300px] m-6 xl:m-0">
            <Image
              src="/joel portrait.jpg"
              className="object-contain"
              fill
              sizes="30vw"
              alt="Portrait Joel"
            />
          </div>
        </div>
        <div className="xl:h-[80vh] flex flex-col justify-center text-lg xl:text-xl text-left max-w-2xl px-6 pb-16 xl:pl-4 xl:py-12">
          <p className="mb-4">
            {language === 'fr'
              ? "Jeune homme j'ai suivi les cours classiques de dessin aux Beaux-Arts et pratiqué assidûment la photographie argentique."
              : 'As a young man, I followed classical drawing courses at the Fine Arts and practiced analog photography diligently.'}
          </p>
          <p className="mb-4">
            {language === 'fr'
              ? 'Puis une carrière dans le monde médico-chirurgical.'
              : 'Then a career in the medical-surgical world.'}
          </p>
          <p className="mb-4">
            {language === 'fr'
              ? 'Depuis 2005 la photographie est devenue mon quotidien.'
              : 'Since 2005, photography has become my daily life.'}
          </p>
          <p className="italic">
            {language === 'fr'
              ? 'De par mon passé professionnel je ne considère le corps que comme une enveloppe.'
              : 'Due to my professional background, I consider the body only as a shell.'}
          </p>
          <p className="italic">
            {language === 'fr'
              ? 'Se libérer des masques que la société nous pousse à porter par une ‘mise à nu’ de sa propre image est un chemin vers la sérénité.'
              : "Freeing oneself from the masks society pushes us to wear through a ‘bare it all’ of one's own image is a path to serenity."}
          </p>
          <p className="italic">
            {language === 'fr'
              ? 'Extraire le corps vital en le détachant du corps esthétique.'
              : 'Extracting the vital body by detaching it from the aesthetic body.'}
          </p>
          <p className="mb-4">
            {language === 'fr'
              ? 'Au travers de mes créations j’invite le visiteur à déposer ses masques et à questionner son intime.'
              : 'Through my creations, I invite the visitor to drop their masks and question their intimacy.'}
          </p>
          <p className="mb-4">
            {language === 'fr'
              ? 'Mon travail en autoportraits est une introspection à la fois thérapeutique et artistique, je ne cherche en aucune manière à choquer, je cherche juste à proposer un voyage au-delà de la surface visible.'
              : 'My work in self-portraits is both a therapeutic and artistic introspection. I do not seek to shock in any way, I just aim to offer a journey beyond the visible surface.'}
          </p>
          <p className="mb-4">
            {language === 'fr'
              ? 'Mes travaux sont présents aux murs de nombreux collectionneurs.'
              : 'My works are present on the walls of many collectors.'}
          </p>
        </div>
      </div>

      <div className="hidden xl:flex m-16 items-center justify-center">
        <BsChevronDoubleDown />
      </div>

      <div className="mt-6 md:mt-12 2xl:mt-24 xl:col-span-2 text-left px-6 pb-16 xl:pb-24 xl:mx-auto xl:max-w-5xl">
        <h2 className="text-xl xl:text-2xl font-bold mb-6">
          {currentContent.title}
        </h2>
        <ul className="mb-12">
          {currentContent.artisticTraining.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h2 className="text-xl xl:text-2xl font-bold mb-6">
          {currentContent.organizerTitle}
        </h2>
        <ul className="mb-12">
          {currentContent.organizer.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h2 className="text-xl xl:text-2xl font-bold mb-6">
          {currentContent.exhibitionsTitle}
        </h2>
        <ul>
          {currentContent.exhibitions.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Bio
