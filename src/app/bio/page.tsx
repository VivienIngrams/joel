import Link from 'next/link'
import Image from 'next/image'

import React from 'react'
import { BsChevronDoubleDown } from 'react-icons/bs'

const Bio = () => {
  return (
    <div>
    <div className="xl:h-[75vh] pt-12 xl:grid xl:grid-cols-2 bg-white text-gray-500 xl:mx-[10vw] ">
      <div className="flex items-center justify-start xl:justify-center">
        <div className="relative  flex flex-col items-center xl:justify-center h-[300px] xl:h-[500px] w-[200px] xl:w-[300px] m-6 xl:m-0">
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
          Jeune homme j&apos;ai suivi les cours classiques de dessin aux
          Beaux-Arts et pratiqué assidûment la photographie argentique.
        </p>
        <p className="mb-4">
          Puis une carrière dans le monde médico-chirurgical.
        </p>
        <p className="mb-4">
          Depuis 2005 la photographie est devenue mon quotidien.
        </p>
        <p className="italic">
          «De par mon passé professionnel je ne considère le corps que comme une
          enveloppe.
        </p>
        <p className="italic">
          Se libérer des masques que la société nous pousse à porter par une
          ‘’mise à nu’’ de sa propre image est un chemin vers la sérénité.
        </p>
        <p className="italic">
          Extraire le corps vital en le détachant du corps esthétique.
        </p>
        <p className="mb-4">
          Au travers de mes créations j’invite le visiteur à déposer ses masques
          et à questionner son intime.
        </p>
        <p className="mb-4">
          Mon travail en autoportraits est une introspection à la fois
          thérapeutique et artistique, je ne cherche en aucune manière à
          choquer, je cherche juste à proposer un voyage au delà de la surface
          visible».
        </p>
        <p className="">
          Mes travaux sont présents aux murs de nombreux collectionneurs.
        </p>
      </div>
      </div>
      <div className="hidden xl:flex m-16  items-center justify-center ">
        <BsChevronDoubleDown />
      </div>
      {/* Additional Content */}
      <div className="mt-6 md:mt-12 2xl:mt-24 xl:col-span-2 text-left px-6 pb-16 xl:pb-24 xl:mx-auto xl:max-w-5xl">
        <h2 className="text-xl xl:text-2xl font-bold mb-6">
          Formations artistiques
        </h2>
        <ul className="mb-12">
          <li>1968/1970 Beaux-Arts Toulouse CDS Dessin M.Espinasse</li>
          <li>
            2008 Formation au tirage Platine Palladium : L.Lafolie, France
          </li>
          <li>
            2010 Résidence « One to one Expert, Platine Palladium » : Dick
            Arentz, Flagstaff-USA
          </li>
          <li>
            2014 Rencontre « Aux limites de l&apos;acte photographique » :
            A.D&apos;Agata, Arles, France
          </li>
        </ul>

        <h2 className="text-xl xl:text-2xl font-bold mb-6">
          Organisateur, Animateur, Conférencier
        </h2>
        <ul className="mb-12">
          <li>Animateur Atelier couleurs en duo avec Johanna Senpau</li>
          <li>
            Animateur Atelier « Autour du portrait et du corps » à La chambre
            grand format argentique
          </li>
          <li>
            Animateur de 4 Résidences photographiques de juillet à La Maison
            Jaune, Revel
          </li>
          <li>
            Animateur de 5 ateliers « Approche de la photographie de nu en
            studio »
          </li>
          <li>Conférencier pour l&apos;AFP « Démarche d&apos;auteur »</li>
          <li>
            Conférencier ASS Poussière d&apos;Images «L&apos;autoportrait,
            démarche d&apos;auteur»
          </li>
          <li>
            Animateur avec l&apos;artiste Diana LUI de 4 ateliers «
            Artiste-Auteur », à La Maison Jaune, Revel
          </li>
          <li>
            Animateur de 6 stages « Le nu en studio, approche, réalisation »
          </li>
          <li>
            Conférencier pour l&apos;AFP « L&apos;Editing photographique »
          </li>
          <li>
            Animation de 16 ateliers «pour l&apos;AVF « Premiers pas en
            photographie »
          </li>
        </ul>

        <h2 className="text-xl xl:text-2xl font-bold mb-6">
          Expositions et publications
        </h2>
        <ul>
          <li>
            Série &quot; Klein d&apos;œil&quot; dans la revue d&apos;art
            &quot;AZART N°15&quot;
          </li>
          <li>Galerie Numeriphot Toulouse &quot; Klein d&apos;œil&quot;</li>
          <li>Chemins des artistes, série « Intimités »</li>
          <li>
            Les Echappées Belles, Espace Beaurepaire Paris «série »Survol »
          </li>
          <li>
            1° Prix CANSON &quot;Couleur Bleue&quot; pour &quot;Anouchka Klein
            d&apos;œil&quot;
          </li>
          <li>
            Arts Vagabonds &quot; Galerie Libre Cours &quot; série&quot; Carrés
            intimes&quot;
          </li>
          <li>
            CNIT La Défense Paris , extraits de &quot; Klein d&apos;œil&quot;
          </li>
          <li>
            Reportage et 1° de couv sur la revue &quot; EXCLUSIVE BRAZIL
            MUNDO&quot;
          </li>
          <li>
            2 couvertures de magazine &quot; EXCLUSIVE BRAZIL MUNDO&quot; série
            &quot; Klein d&apos;œil&quot;
          </li>
          <li>Galerie ATYPIC , série Portraits de Femmes</li>
          <li>
            Artistes à suivre, Galerie l&apos;Atelier à Cassaignes, série &quot;
            Klein d&apos;œil&quot;
          </li>
          <li>
            Arts Vagabonds, Le Chateau ST Félix Lauragais série &quot; Klein
            d&apos;œil&quot;
          </li>
          <li>Voyage du Monde Revel série “Afrique du Sud sauvage”</li>
          <li>Artistes à suivre SERRES série “Bas les Masques”</li>
          <li>
            L&apos;invité d&apos; Arts Vagabonds, Chateau de Saint-Julia série «
            Incertitudes »
          </li>
          <li>
            Siège social de la Banque Courtois Toulouse : Série des « Ailes
            Anciennes »
          </li>
          <li>Salon Créativ Art Toulouse</li>
          <li>Galerie Numeriphot Toulouse &quot; Abemous papam&quot;</li>
          <li>Galerie DESVENDA, Porto, Portugal « En Suspension(s) »</li>
          <li>
            Invité d&apos;honneur photographe Festival du film insolite,
            Renne-le-château « Immortalem »
          </li>
          <li>
            Salon Européen d&apos;art de Carcassonne &quot; Abemous Papam&quot;
            Grand Prix
          </li>
          <li>
            Galerie des Bains Villemur/tarn Invité d&apos;honneur Série «
            Anbandon(s) »
          </li>
          <li>Galerie Numeriphot Toulouse Série « Anbandon(s) »</li>
          <li>Vietnam Hopital de Tan-Hoa reportage pour “Children Action”</li>
          <li>
            Edition d&apos;un livre Mission Than-Hôa présentant le reportage du
            Vietnam, format 25 X 32 116 pages tirage 1200 ex
          </li>
          <li>
            44° Salon d&apos;Automne de Colomiers &quot; Abemous Papam&quot;
            Grand Prix Henri Molina
          </li>
          <li>Les 111 des Arts Hotel-Dieu Toulouse</li>
          <li>
            Invité d&apos;Honneur du 43° Salon d&apos;Automne de Colomiers série
            &quot; Mon corps est ma toîle&quot;
          </li>
          <li>NUMERIPHOT Toulouse , Exposition : « New-York-M240 »</li>
          <li>Les 111 des Arts Hotel-Dieu Toulouse</li>
          <li>86° Salon des Méridionaux : « Minotaurus »</li>
          <li>Galerie ARTIEMPO Toulouse : « Corps et déchirures »</li>
          <li>11° FEPN Arles série &apos;JE&apos; contre le ‘MOI&apos;.</li>
          <li>
            Galerie de l&apos;ECHARPE Toulouse série &quot; Abemous Papam&quot;
          </li>
          <li>
            6° Rencontres Focale-nu-art série &apos;Le JE&apos; contre le
            ‘MOI&apos;
          </li>
          <li>
            Off des 21° VoiesOff Arles avec le Collectif APPROCHE-PHOTO series
            “Soumissions”
          </li>
          <li>
            Galerie Dominique.C Chateau d&apos;Auriac série &quot; Mon corps est
            ma toîle&quot;
          </li>
          <li>Chateau-H St Julia serie &quot; Abemous Papam&quot;</li>
          <li>Artistes à suivre « Dante l&apos;Inferno »</li>
        </ul>
      </div>
      </div>
  )
}

export default Bio
