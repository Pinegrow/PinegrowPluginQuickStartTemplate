$(function () {
    $('body').one('pinegrow-ready', function (e, pinegrow) {

        //Add a framework prefix - if you plan on having multiple versions, this should be the same for each version
        let type_prefix = 'PinegrowExample';
        //Add a framework id, it should be unique to this framework and version
        let framework_id = 'my_plugin_id';
        //Add a framework name
        var framework = new PgFramework(framework_id, 'Pinegrow-Example');

        framework.type = type_prefix;

        //Prevent the activation of multiple versions of the plugin - if this should be allowed, change to false
        framework.allow_single_type = true;

        //Optional, add a badge to the framework list notify user of new or updated status
        framework.info_badge = 'v1.0.0';

        //Add a description of the plugin
        framework.description = 'A Pinegrow Plugin Boilerplate';

        //Add a framework  author to be displayed with the framework templates
        framework.author = 'Pinegrow';

        //Add a website "https://pinegrow.com" or mailto "mailto:info@pinegrow.com" link for redirect on author name click
        framework.author_link = 'https://pinegrow.com';

        //Add a regex string for any CSS that shouldn't be user editable
        framework.ignore_css_files = [/main.css/, /normalize.css/];

        // Tell Pinegrow about the framework
        pinegrow.addFramework(framework);

        //Add our template into the project - change based on plugin structure
        framework.addTemplateProjectFromResourceFolder('template', null, 500);

        //uncomment the line below for debugging - opens devtools on Pinegrow Launch
        //require('nw.gui').Window.get().showDevTools();

        //The code below adds a control to target all text contained within a <p> tag.
        //note that we don't prefix the id, section ids and field ids because we'll do that with the .addPrefix function below.
        var paragraph_options = new PgComponentType('paragraph_options', '', {
            selector: 'p',
            sections: {
                p_options: {
                    name: '<p> Options',
                    default_open: false,
                    fields: {
                        p_caps: {
                            type: 'checkbox',
                            name: 'Make paragraphs all caps?',
                            action: 'apply_class',
                            value: 'pge-caps'
                        }
                    }
                }
            }
        });
        
        //prefixes component id, fields, and sections names
        paragraph_options.addPrefix(framework_id);

        //adds component to framework
        framework.addComponentType(paragraph_options);

        //The code below adds an article box component to the "Library" panel. It also adds four controls - a checkbox, a select dropdown, a file picker, and a text box all using 'apply_class', for that component to the "Properties" panel. 
        var article_box = new PgComponentType('article-box', 'Article Box', {
            selector: '.pge-article-box',
            code: `<article class="pge-article-box">
            <img src="' + pinegrow.getPlaceholderImage() + '" alt="">
            <div class="pge-article-body">
            <h3 class="pge-article-title">Title</h3>
            <p class="pge-article-meta">Written by <a href="#" class="author">Super User</a> on 12 April 2012. Posted in <a href="#">Blog</a></p>
            <p class="pge-article-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
            <button>Read More</button>
            </div>
        </article>`,
            sections: {
                checkbox_options: {
                    name: 'Article Options',
                    default_open: true,
                    fields: {
                        title_dropcap: {
                            type: 'checkbox',
                            name: 'Add dropcap to title?',
                            action: 'apply_class',
                            value: 'pge-dropcap'
                        },
                    }
                },
                select_options: {
                    name: 'Meta options',
                    fefault_open: true,
                    fields: {
                        meta_style: {
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
                file_options: {
                    name: 'Article Image Options',
                    default_open: false,
                    fields: {
                        picture_options: {
                            type: 'image',
                            file_picker: true,
                            name: 'Article image',
                            action: 'custom',
                            value: 1,
                            get_value: function (pgel) {
                                return pgel.findOne('img').getAttribute('src') || null;
                            },
                            set_value: function (pgel, value) {
                                pgel.findOne('img').setAttribute('src', value);
                                return value;
                            }
                        },
                        alt_options: {
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
        article_box.addPrefix(framework_id);
        framework.addComponentType(article_box);

        //Create an instance of a button maker for our toggle colors
        var bm = new PgToggleButtonMaker();

        //Create a toggle control with two custom button color controls and utilizing 'element_attribute'
        var animated_toggle = new PgComponentType('animated-toggle', 'Toggle', {
            selector: '.toggle-wrapper',
            code: `<div class="toggle-wrapper" unchecked-color="red" checked-color="green">
                <div class="pge-toggle">
                    <input id="pge-toggle" type="checkbox"/>
                    <label class="toggle-item" for="pge-toggle"></label>
                </div>
            </div>`,
            sections: {
                toggle_options: {
                    name: 'Toggle Options',
                    default_open: true,
                    fields: {
                        toggle_unchecked_color: {
                            type: 'select',
                            name: 'Unchecked color?',
                            action: 'element_attribute',
                            attribute: 'unchecked-color',
                            toggle_buttons: true,
                            options: [{
                                    key: 'red',
                                    name: 'Red',
                                    html: bm.makeColor('#f00')
                                },
                                {
                                    key: 'green',
                                    name: 'Green',
                                    html: bm.makeColor('#0f0')
                                },
                                {
                                    key: 'blue',
                                    name: 'Blue',
                                    html: bm.makeColor('#00f')
                                }
                            ]
                        },
                        toggle_checked_color: {
                            type: 'select',
                            name: 'Checked color?',
                            action: 'element_attribute',
                            attribute: 'checked-color',
                            toggle_buttons: true,
                            options: [{
                                    key: 'red',
                                    name: 'Red',
                                    html: bm.makeColor('#f00')
                                },
                                {
                                    key: 'green',
                                    name: 'Green',
                                    html: bm.makeColor('#0f0')
                                },
                                {
                                    key: 'blue',
                                    name: 'Blue',
                                    html: bm.makeColor('#00f')
                                }
                            ]
                        }
                    }
                }
            }
        });
        animated_toggle.addPrefix(framework_id);
        framework.addComponentType(animated_toggle);

        //This code creates the "PG Example Elements" section in the "Library" panel. It then populates that panel with the two components created above.
        var article_section = new PgFrameworkLibSection('pgearticle-section', 'PG Example Elements');
        pge_article_section.setComponentTypes([article_box, toggle]);
        framework.addLibSection(article_section);
    });
});
