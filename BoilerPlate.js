$(function () {
    $('body').one('pinegrow-ready', function (e, pinegrow) {

        //Add a framework prefix - if you plan on having multiple versions, this should be the same for each version
        let type_prefix = 'PinegrowExample';
        //Add a framework id, it should be unique to this framework and version
        let framework_id = 'pge';
        //Add a framework name
        var framework = new PgFramework(framework_id, 'Pinegrow-Example');

        //Prevent the activation of multiple versions of the plugin - if this should be allowed, change to false
        framework.type = type_prefix;
        framework.allow_single_type = true;

        //Optional, add a badge to the framework list notify user of new or updated status
        //framework.info_badge = 'v1.0.0';

        //Add a description of the plugin
        framework.description = 'A Pinegrow Plugin Boilerplate';
        //Add a framework  author to be displayed with the framework templates
        framework.author = 'Pinegrow';
        //Add a website "https://pinegrow.com" or mailto "mailto:info@pinegrow.com" link for redirect on author name click
        framework.author_link = 'https://pinegrow.com';

        //Add a regex string for any CSS that shouldn't be user editable
        framework.ignore_css_files = [/REGEX/];

        // Tell Pinegrow about the framework
        pinegrow.addFramework(framework);

        //Add our template into the project - change based on plugin structure
        framework.addTemplateProjectFromResourceFolder('template', null, 500);

        //uncomment the line below for debugging - opens devtools on Pinegrow Launch
        require('nw.gui').Window.get().showDevTools();

        //Path helper
        var toLocalPath = function (p) {
            return p.replace(/\//g, path.sep);
        };

        //Image helper
        var getPlaceholderImage = function () {
            return pinegrow.getPlaceholderImage();
        }

        //Project resources
        /*var resource_files = [
            'css/uikit.min.css',
            'js/uikit.min.js',
            'js/uikit-icons.min.js'
        ];*/

        //Add resource files to project in header or footer depending on type
        /**resource_files.forEach(function (resource_file) {
            var file = framework.getResourceFile('template/resources/' + resource_file);
            var resource = new PgComponentTypeResource(file);
            resource.relative_url = resource_file;
            resource.source = toLocalPath(file);
            resource.footer = resource_file.indexOf('.js') >= 0;
            resource.type = resource_file.indexOf('.js') >= 0 ? 'application/javascript' : 'text/css'
            framework.resources.add(resource);
        });*/

        var pge_article_box = new PgComponentType('pge-article-box', 'Article Box', {
            selector: '.pge-article-box',
            tags: 'major',
            code: '<article class="pge-article-box">\
            <img class="centered" src="' + getPlaceholderImage() + '" alt="" height="42" width="42">\
            <h3 class="pge-article-title">Title</h3>\
            <p class="pge-article-meta">Written by <a href="#">Super User</a> on 12 April 2012. Posted in <a href="#">Blog</a></p>\
            <p class="pge-article-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>\
            </article>',
            sections: {
                pge_checkbox_options: {
                    name: 'Article Options',
                    default_open: true,
                    fields: {
                        pge_title_dropcap: {
                            type: 'checkbox',
                            name: 'Add dropcap to title?',
                            action: 'apply_class',
                            value: 'pge-dropcap'
                        },
                    }
                },
                pge_select_options: {
                    name: 'Meta options',
                    fefault_open: true,
                    fields: {
                        pge_meta_style: {
                            type: 'select',
                            name: 'Select meta style',
                            action: 'apply_class',
                            show_empty: true,
                            options: [{
                                    key: 'pge-meta-grey',
                                    name: 'Greyed'
                                },
                                {
                                    key: 'pge-meta-underlined',
                                    name: 'Underlined'
                                },
                                {
                                    key: 'pge-meta-highlight',
                                    name: 'Author highlight'
                                }
                            ]
                        },
                    }
                },
                pge_file_options: {
                    name: 'Article Image Options',
                    default_open: false,
                    fields: {
                        pge_picture_options: {
                            type: 'image',
                            file_picker: true,
                            name: 'Article image',
                            action: 'custom',
                            value: 1,
                            get_value: function (pgel) {
                                return pgel.findOne('img').getAttribute('src') || null; 
                            },
                            set_value: function(pgel, value) {
                                pgel.findOne('img').setAttribute('src', value);
                                return value;
                            }
                        },
                        pge_alt_options: {
                            type: 'text',
                            live_update: false,
                            name: 'Image alt text',
                            action: 'custom',
                            value: 1,
                            get_value: function (pgel) {
                                return pgel.findOne('img').getAttribute('alt') || null;
                            },
                            set_value: function (pgel, value) {
                                pgel.findOne('img').setAttribute('alt', value);
                                return value;
                            }
                        }
                    }
                }
            }
        });
        //pge_article_box.addPrefix(framework_id);
        framework.addComponentType(pge_article_box);

        var pge_article_section = new PgFrameworkLibSection('pgearticle-section', 'Article Elements');
        pge_article_section.setComponentTypes([pge_article_box]);
        framework.addLibSection(pge_article_section);
    });
});
