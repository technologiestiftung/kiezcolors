![](https://img.shields.io/badge/Built%20with%20%E2%9D%A4%EF%B8%8F-at%20Technologiestiftung%20Berlin-blue)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

# Kiezcolors

*Kiezcolors* is a map based tool that creates a postcard showing the landuse distribution in your neighborhood. The browser application uses Berlin’s landuse open data. By zooming in and out you can pick a location within Berlin and position it inside the circle. *Kiezcolors* then maps the individual areas onto a tree map diagram. You can print the resulting motive as a postcard and share it!

![kiezcolors_overview](https://github.com/technologiestiftung/kiezcolors/assets/46717848/fc4b20c6-4485-4a53-aafd-19c2ce5633e0)


## Tech stack

This website is a [svelte](https://svelte.dev/) app.

## Developing

Start a development server by running:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Data
You can find the data on Berlins [Geoportal (FIS-Broker)](https://fbinter.stadt-berlin.de/fb/)

Search for: *ALKIS*

Select *ALKIS Berlin (Amtliches Liegenschaftskatasterinformationssystem)*

Then select *ALKIS Berlin Tatsächliche Nutzung* on the right to get the WFS Link to download the data.

Or download directly via WFS: https://fbinter.stadt-berlin.de/fb/wfs/data/senstadt/s_wfs_alkis_tatsaechlichenutzungflaechen

You will need to convert the data to GeoJSON format if you want to create the tiles for the map. 
  
## Tile Creation

The tiles we created with *tippecanoe* by running the following command:

```bash
tippecanoe --output-to-directory ./tiles '--use-attribute-for-id=id' --no-tile-compression --force -B 13 '--minimum-zoom=10' '--maximum-zoom=13' ./alkis.geojson
```

## Licence

The landuse data *ALKIS Berlin* can be downloaded from the Geoportal Berlin.

## Contributing

Before you create a pull request, write an issue so we can discuss your changes.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Content Licensing

Texts and content available as [CC BY](https://creativecommons.org/licenses/by/3.0/de/).

## Credits

<table>
  <tr>
        <td>
      Made by <a href="https://odis-berlin.de">
        <br />
        <br />
        <img width="200" src="https://logos.citylab-berlin.org/logo-odis-berlin.svg" />
      </a>
    </td>
    <td>
      In cooperation with <a href="https://citylab-berlin.org/de/start/">
        <br />
        <br />
        <img width="200" src="https://citylab-berlin.org/wp-content/uploads/2021/05/citylab-logo.svg" />
      </a>
    </td>
    <td>
      A project by <a href="https://www.technologiestiftung-berlin.de/">
        <br />
        <br />
        <img width="150" src="https://citylab-berlin.org/wp-content/uploads/2021/05/tsb.svg" />
      </a>
    </td>
    <td>
      Supported by <a href="https://www.berlin.de/rbmskzl/">
        <br />
        <br />
        <img width="80" src="https://citylab-berlin.org/wp-content/uploads/2021/12/B_RBmin_Skzl_Logo_DE_V_PT_RGB-300x200.png" />
      </a>
    </td>
  </tr>
</table>

## Related Projects
