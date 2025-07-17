import type { Schema, Struct } from '@strapi/strapi';

export interface ContentContent extends Struct.ComponentSchema {
  collectionName: 'components_content_contents';
  info: {
    description: '';
    displayName: 'Content';
  };
  attributes: {
    anchor: Schema.Attribute.String;
    content: Schema.Attribute.Blocks;
  };
}

export interface ContentGallery extends Struct.ComponentSchema {
  collectionName: 'components_content_galleries';
  info: {
    description: '';
    displayName: 'Gallery';
  };
  attributes: {
    images: Schema.Attribute.Media<'images' | 'files'>;
  };
}

export interface ContentHeading extends Struct.ComponentSchema {
  collectionName: 'components_content_headings';
  info: {
    displayName: 'heading';
  };
  attributes: {
    heading: Schema.Attribute.String;
  };
}

export interface ContentImageVersions extends Struct.ComponentSchema {
  collectionName: 'components_image_versions';
  info: {
    description: 'Dynamic image versions with custom types';
    displayName: 'Image Versions';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    version: Schema.Attribute.Enumeration<['mobile', 'desktop']> &
      Schema.Attribute.Required;
  };
}

export interface ContentPetitionStats extends Struct.ComponentSchema {
  collectionName: 'components_content_petition_stats';
  info: {
    displayName: 'Petition Stats';
  };
  attributes: {
    bg_colour: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    ctaLabel: Schema.Attribute.String;
    ctaLink: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    show_progress_bar: Schema.Attribute.Boolean;
    show_signature_count: Schema.Attribute.Boolean;
    show_target_count: Schema.Attribute.Boolean;
    show_time_left: Schema.Attribute.Boolean;
    sub_heading: Schema.Attribute.String;
  };
}

export interface ContentShare extends Struct.ComponentSchema {
  collectionName: 'components_content_shares';
  info: {
    displayName: 'share';
  };
  attributes: {
    message: Schema.Attribute.String;
  };
}

export interface ContentVideo extends Struct.ComponentSchema {
  collectionName: 'components_content_videos';
  info: {
    displayName: 'Video';
  };
  attributes: {
    title: Schema.Attribute.String;
    video: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<'plugin::video-field.video'>;
  };
}

export interface ElementsButton extends Struct.ComponentSchema {
  collectionName: 'components_elements_buttons';
  info: {
    displayName: 'button';
  };
  attributes: {
    label: Schema.Attribute.String;
    target: Schema.Attribute.String;
  };
}

export interface FormFormField extends Struct.ComponentSchema {
  collectionName: 'components_form_form_fields';
  info: {
    description: '';
    displayName: 'Form Field';
  };
  attributes: {
    label: Schema.Attribute.String;
    name: Schema.Attribute.String;
    required: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    type: Schema.Attribute.Enumeration<
      [
        'text',
        'email',
        'textarea',
        'select',
        'boolean',
        'media',
        'date',
        'number',
        'icon',
        'hidden',
        'file',
      ]
    > &
      Schema.Attribute.Required;
  };
}

export interface FormFormSection extends Struct.ComponentSchema {
  collectionName: 'components_form_form_sections';
  info: {
    description: '';
    displayName: 'Form Section';
  };
  attributes: {
    bg_colour: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    form_field: Schema.Attribute.Component<'form.form-field', true>;
    heading: Schema.Attribute.String;
    mailing_list: Schema.Attribute.Boolean;
  };
}

export interface LayoutBanner extends Struct.ComponentSchema {
  collectionName: 'components_blocks_banners';
  info: {
    description: '';
    displayName: 'Banner';
  };
  attributes: {
    bg_colour: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    heading: Schema.Attribute.String;
    image_versions: Schema.Attribute.Component<'content.image-versions', true>;
    sub_heading: Schema.Attribute.String;
  };
}

export interface LayoutCalendar extends Struct.ComponentSchema {
  collectionName: 'components_layout_calendars';
  info: {
    displayName: 'Calendar';
  };
  attributes: {
    bg_colour: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    heading: Schema.Attribute.String;
  };
}

export interface LayoutCommentSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_comment_sections';
  info: {
    displayName: 'Comment Section';
  };
  attributes: {
    heading: Schema.Attribute.String;
  };
}

export interface LayoutEventSidebar extends Struct.ComponentSchema {
  collectionName: 'components_layout_event_sidebars';
  info: {
    description: '';
    displayName: 'Event Sidebar';
  };
  attributes: {
    heading: Schema.Attribute.String;
    share: Schema.Attribute.Component<'content.share', false>;
  };
}

export interface LayoutFeatured extends Struct.ComponentSchema {
  collectionName: 'components_layout_featureds';
  info: {
    displayName: 'Featured';
  };
  attributes: {
    bg_colour: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    content: Schema.Attribute.Blocks;
    heading: Schema.Attribute.String;
    number_to_display: Schema.Attribute.Integer;
  };
}

export interface LayoutFeaturedEventsSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_featured_events_sections';
  info: {
    displayName: 'Featured Events Section';
  };
  attributes: {
    bg_colour: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    content: Schema.Attribute.Blocks;
    heading: Schema.Attribute.String;
    number_to_display: Schema.Attribute.Integer;
  };
}

export interface LayoutInfoCardSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_info_card_sections';
  info: {
    displayName: 'Info Card Section';
  };
  attributes: {
    info_card: Schema.Attribute.Component<'layout.info-cards', true>;
  };
}

export interface LayoutInfoCards extends Struct.ComponentSchema {
  collectionName: 'components_layout_info_cards';
  info: {
    displayName: 'Info Cards';
  };
  attributes: {
    heading: Schema.Attribute.String;
    icon: Schema.Attribute.String &
      Schema.Attribute.CustomField<
        'plugin::react-icons-picker.react-icons-picker',
        {
          icon: 'text';
        }
      >;
    text: Schema.Attribute.Text;
  };
}

export interface LayoutInfoTabFields extends Struct.ComponentSchema {
  collectionName: 'components_layout_info_tab_fields';
  info: {
    displayName: 'Info Tab Fields';
  };
  attributes: {
    icon: Schema.Attribute.String &
      Schema.Attribute.CustomField<
        'plugin::react-icons-picker.react-icons-picker',
        {
          icon: 'text';
        }
      >;
    text: Schema.Attribute.Text;
  };
}

export interface LayoutInfoTabSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_info_tab_sections';
  info: {
    displayName: 'Info Tab Section';
  };
  attributes: {
    bg_colour: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    icon_colour: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    tabs: Schema.Attribute.Component<'layout.info-tabs', true>;
  };
}

export interface LayoutInfoTabs extends Struct.ComponentSchema {
  collectionName: 'components_layout_info_tabs';
  info: {
    description: '';
    displayName: 'Info Tabs';
  };
  attributes: {
    heading: Schema.Attribute.String;
    tab_content: Schema.Attribute.Component<'layout.info-tab-fields', true>;
  };
}

export interface LayoutMixedContentTabFields extends Struct.ComponentSchema {
  collectionName: 'components_layout_mixed_content_tab_fields';
  info: {
    description: '';
    displayName: 'Mixed Content Tab Fields';
  };
  attributes: {
    article: Schema.Attribute.Blocks;
    images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    type: Schema.Attribute.Enumeration<['article', 'video', 'image']> &
      Schema.Attribute.Required;
    videos: Schema.Attribute.Component<'content.video', true>;
  };
}

export interface LayoutMixedContentTabSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_mixed_content_tab_sections';
  info: {
    description: '';
    displayName: 'Mixed Content Tab Section';
  };
  attributes: {
    bg_colour: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    tabs: Schema.Attribute.Component<'layout.mixed-content-tabs', true>;
  };
}

export interface LayoutMixedContentTabs extends Struct.ComponentSchema {
  collectionName: 'components_layout_mixed_content_tabs';
  info: {
    displayName: 'Mixed Content Tabs';
  };
  attributes: {
    heading: Schema.Attribute.String;
    tab_content: Schema.Attribute.Component<
      'layout.mixed-content-tab-fields',
      false
    >;
  };
}

export interface LayoutNavigation extends Struct.ComponentSchema {
  collectionName: 'components_layout_navigations';
  info: {
    displayName: 'Navigation';
  };
  attributes: {
    navigation_menu: Schema.Attribute.Relation<
      'oneToOne',
      'api::navigation.navigation'
    >;
  };
}

export interface LayoutOrganisationSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_organisation_sections';
  info: {
    displayName: 'Organisation Section';
  };
  attributes: {
    organisation: Schema.Attribute.Component<'organisation.organisation', true>;
  };
}

export interface LayoutPetitionSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_petition_sections';
  info: {
    displayName: 'Petition Section';
  };
  attributes: {
    Button: Schema.Attribute.Component<'elements.button', false>;
    heading: Schema.Attribute.String;
  };
}

export interface LayoutPlace extends Struct.ComponentSchema {
  collectionName: 'components_layout_places';
  info: {
    description: '';
    displayName: 'Place';
  };
  attributes: {
    place: Schema.Attribute.Relation<'oneToOne', 'api::place.place'>;
  };
}

export interface LayoutPlacesSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_places_sections';
  info: {
    description: '';
    displayName: 'Places Section';
  };
  attributes: {
    bg_colour: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    content: Schema.Attribute.Blocks;
    heading: Schema.Attribute.String;
    places: Schema.Attribute.Component<'layout.place', true>;
  };
}

export interface LayoutSidebar extends Struct.ComponentSchema {
  collectionName: 'components_layout_sidebars';
  info: {
    description: '';
    displayName: 'Sidebar';
  };
  attributes: {
    form: Schema.Attribute.Component<'form.form-section', false>;
    heading: Schema.Attribute.String;
    navigation: Schema.Attribute.Component<'layout.navigation', false>;
  };
}

export interface LayoutSocialPlatforms extends Struct.ComponentSchema {
  collectionName: 'components_layout_social_platforms';
  info: {
    displayName: 'Social Platforms';
  };
  attributes: {
    heading: Schema.Attribute.String;
    organisation: Schema.Attribute.Relation<
      'oneToOne',
      'api::organisation.organisation'
    >;
  };
}

export interface LayoutStatsSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_stats_sections';
  info: {
    displayName: 'Stats Section';
  };
  attributes: {
    heading: Schema.Attribute.String;
  };
}

export interface LayoutTextTabs extends Struct.ComponentSchema {
  collectionName: 'components_layout_text_tabs';
  info: {
    displayName: 'Text Tabs';
  };
  attributes: {
    article: Schema.Attribute.Blocks;
    heading: Schema.Attribute.String;
  };
}

export interface OrganisationAddress extends Struct.ComponentSchema {
  collectionName: 'components_organisation_addresses';
  info: {
    description: '';
    displayName: 'Address';
  };
  attributes: {
    heading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Factory Building'>;
    place: Schema.Attribute.Relation<'oneToOne', 'api::place.place'>;
  };
}

export interface OrganisationCertificationLogos extends Struct.ComponentSchema {
  collectionName: 'components_organisation_certification_logos';
  info: {
    description: '';
    displayName: 'Certification Logos';
  };
  attributes: {
    label: Schema.Attribute.String;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
  };
}

export interface OrganisationContact extends Struct.ComponentSchema {
  collectionName: 'components_organisation_contacts';
  info: {
    description: '';
    displayName: 'Contact';
  };
  attributes: {
    heading: Schema.Attribute.String;
    organisation: Schema.Attribute.Relation<
      'oneToOne',
      'api::organisation.organisation'
    >;
  };
}

export interface OrganisationContactList extends Struct.ComponentSchema {
  collectionName: 'components_organisation_contact_lists';
  info: {
    displayName: 'Contact List';
  };
  attributes: {
    contact: Schema.Attribute.Component<'organisation.contact', true>;
  };
}

export interface OrganisationOrganisation extends Struct.ComponentSchema {
  collectionName: 'components_organisation_organisations';
  info: {
    displayName: 'Organisation';
  };
  attributes: {
    organisation: Schema.Attribute.Relation<
      'oneToOne',
      'api::organisation.organisation'
    >;
  };
}

export interface OrganisationSocialMedia extends Struct.ComponentSchema {
  collectionName: 'components_organisation_social_medias';
  info: {
    description: '';
    displayName: 'Social';
  };
  attributes: {
    handle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'MeanwhileGdnsOfficial'>;
    icon: Schema.Attribute.String &
      Schema.Attribute.CustomField<
        'plugin::react-icons-picker.react-icons-picker',
        {
          icon: 'string';
        }
      >;
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    platform: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Facebook'>;
    url: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'MeanwhileGdnsOfficial'>;
  };
}

export interface OrganisationSocialPlatforms extends Struct.ComponentSchema {
  collectionName: 'components_organisation_social_platforms';
  info: {
    displayName: 'Social Platforms';
  };
  attributes: {
    social: Schema.Attribute.Component<'organisation.social-media', true>;
  };
}

export interface PlaceAddress extends Struct.ComponentSchema {
  collectionName: 'components_place_addresses';
  info: {
    description: '';
    displayName: 'Address';
  };
  attributes: {
    address_line_1: Schema.Attribute.String;
    address_line_2: Schema.Attribute.String;
    address_line_3: Schema.Attribute.String;
    geo_location: Schema.Attribute.Component<'place.geo-location', false>;
    postcode: Schema.Attribute.String;
    town: Schema.Attribute.String;
  };
}

export interface PlaceFeaturedEventsSection extends Struct.ComponentSchema {
  collectionName: 'components_place_featured_events_sections';
  info: {
    displayName: 'Featured Events Section';
  };
  attributes: {
    bg_colour: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    content: Schema.Attribute.Blocks;
    heading: Schema.Attribute.String;
    number_to_display: Schema.Attribute.Integer;
  };
}

export interface PlaceGeoLocation extends Struct.ComponentSchema {
  collectionName: 'components_place_geo_locations';
  info: {
    description: '';
    displayName: 'Geo Location';
  };
  attributes: {
    latitude: Schema.Attribute.Float;
    longitude: Schema.Attribute.Float;
    what3words: Schema.Attribute.String;
  };
}

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    displayName: 'openGraph';
    icon: 'project-diagram';
  };
  attributes: {
    ogDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogType: Schema.Attribute.String;
    ogUrl: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    structuredData: Schema.Attribute.JSON;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'content.content': ContentContent;
      'content.gallery': ContentGallery;
      'content.heading': ContentHeading;
      'content.image-versions': ContentImageVersions;
      'content.petition-stats': ContentPetitionStats;
      'content.share': ContentShare;
      'content.video': ContentVideo;
      'elements.button': ElementsButton;
      'form.form-field': FormFormField;
      'form.form-section': FormFormSection;
      'layout.banner': LayoutBanner;
      'layout.calendar': LayoutCalendar;
      'layout.comment-section': LayoutCommentSection;
      'layout.event-sidebar': LayoutEventSidebar;
      'layout.featured': LayoutFeatured;
      'layout.featured-events-section': LayoutFeaturedEventsSection;
      'layout.info-card-section': LayoutInfoCardSection;
      'layout.info-cards': LayoutInfoCards;
      'layout.info-tab-fields': LayoutInfoTabFields;
      'layout.info-tab-section': LayoutInfoTabSection;
      'layout.info-tabs': LayoutInfoTabs;
      'layout.mixed-content-tab-fields': LayoutMixedContentTabFields;
      'layout.mixed-content-tab-section': LayoutMixedContentTabSection;
      'layout.mixed-content-tabs': LayoutMixedContentTabs;
      'layout.navigation': LayoutNavigation;
      'layout.organisation-section': LayoutOrganisationSection;
      'layout.petition-section': LayoutPetitionSection;
      'layout.place': LayoutPlace;
      'layout.places-section': LayoutPlacesSection;
      'layout.sidebar': LayoutSidebar;
      'layout.social-platforms': LayoutSocialPlatforms;
      'layout.stats-section': LayoutStatsSection;
      'layout.text-tabs': LayoutTextTabs;
      'organisation.address': OrganisationAddress;
      'organisation.certification-logos': OrganisationCertificationLogos;
      'organisation.contact': OrganisationContact;
      'organisation.contact-list': OrganisationContactList;
      'organisation.organisation': OrganisationOrganisation;
      'organisation.social-media': OrganisationSocialMedia;
      'organisation.social-platforms': OrganisationSocialPlatforms;
      'place.address': PlaceAddress;
      'place.featured-events-section': PlaceFeaturedEventsSection;
      'place.geo-location': PlaceGeoLocation;
      'shared.open-graph': SharedOpenGraph;
      'shared.seo': SharedSeo;
    }
  }
}
